import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.config.js';
import { logger } from './logger.service.js';
import type { IJwtPayload, SocketUser, UserRole } from '../types/index.js';

interface AuthenticatedSocket extends Socket {
  user?: IJwtPayload;
}

class SocketService {
  private static instance: SocketService;
  private io: Server | null = null;
  private connectedUsers: Map<string, SocketUser> = new Map();

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  /**
   * Initialize Socket.IO with HTTP server
   */
  public initialize(httpServer: HttpServer): Server {
    this.io = new Server(httpServer, {
      cors: {
        origin: env.cors.origin,
        credentials: env.cors.credentials,
        methods: ['GET', 'POST'],
      },
      pingTimeout: 60000,
      pingInterval: 25000,
      transports: ['websocket', 'polling'],
    });

    this.setupMiddleware();
    this.setupEventHandlers();

    logger.info('Socket.IO initialized');
    return this.io;
  }

  /**
   * Setup authentication middleware
   */
  private setupMiddleware(): void {
    if (!this.io) return;

    this.io.use((socket: AuthenticatedSocket, next) => {
      try {
        const token =
          socket.handshake.auth['token'] ||
          socket.handshake.headers['authorization']?.replace('Bearer ', '') ||
          socket.handshake.query['token'];

        if (!token || typeof token !== 'string') {
          return next(new Error('Authentication token required'));
        }

        const decoded = jwt.verify(token, env.jwt.secret, {
          issuer: env.jwt.issuer,
          audience: env.jwt.audience,
        }) as IJwtPayload;

        socket.user = decoded;
        next();
      } catch (error) {
        logger.warn('Socket authentication failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        next(new Error('Authentication failed'));
      }
    });
  }

  /**
   * Setup connection event handlers
   */
  private setupEventHandlers(): void {
    if (!this.io) return;

    this.io.on('connection', (socket: AuthenticatedSocket) => {
      const user = socket.user;

      if (!user) {
        socket.disconnect(true);
        return;
      }

      // Track connected user
      const socketUser: SocketUser = {
        id: socket.id,
        socketId: socket.id,
        userId: user.userId,
        role: user.role,
        joinedAt: new Date(),
      };

      this.connectedUsers.set(socket.id, socketUser);

      // Join user-specific room
      socket.join(`user:${user.userId}`);

      // Join role-based room
      socket.join(`role:${user.role}`);

      logger.info('Socket connected', {
        socketId: socket.id,
        userId: user.userId,
        role: user.role,
      });

      // Emit connection success
      socket.emit('connected', {
        socketId: socket.id,
        userId: user.userId,
        connectedAt: new Date().toISOString(),
      });

      // Handle custom events
      this.setupSocketEvents(socket);

      // Handle disconnection
      socket.on('disconnect', (reason) => {
        this.connectedUsers.delete(socket.id);
        logger.info('Socket disconnected', {
          socketId: socket.id,
          userId: user.userId,
          reason,
        });
      });

      // Handle errors
      socket.on('error', (error) => {
        logger.error('Socket error', {
          socketId: socket.id,
          userId: user.userId,
          error: error.message,
        });
      });
    });
  }

  /**
   * Setup custom socket events
   */
  private setupSocketEvents(socket: AuthenticatedSocket): void {
    // Join a room
    socket.on('join:room', (roomId: string) => {
      socket.join(roomId);
      logger.debug('Socket joined room', { socketId: socket.id, roomId });
      socket.emit('room:joined', { roomId });
    });

    // Leave a room
    socket.on('leave:room', (roomId: string) => {
      socket.leave(roomId);
      logger.debug('Socket left room', { socketId: socket.id, roomId });
      socket.emit('room:left', { roomId });
    });

    // Ping/pong for connection health
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: Date.now() });
    });

    // Typing indicator
    socket.on('typing:start', (data: { roomId: string }) => {
      socket.to(data.roomId).emit('user:typing', {
        userId: socket.user?.userId,
        roomId: data.roomId,
      });
    });

    socket.on('typing:stop', (data: { roomId: string }) => {
      socket.to(data.roomId).emit('user:stopped_typing', {
        userId: socket.user?.userId,
        roomId: data.roomId,
      });
    });
  }

  /**
   * Emit event to specific user
   */
  public emitToUser(userId: string, event: string, data: unknown): void {
    if (!this.io) return;
    this.io.to(`user:${userId}`).emit(event, data);
  }

  /**
   * Emit event to users with specific role
   */
  public emitToRole(role: UserRole, event: string, data: unknown): void {
    if (!this.io) return;
    this.io.to(`role:${role}`).emit(event, data);
  }

  /**
   * Emit event to a room
   */
  public emitToRoom(roomId: string, event: string, data: unknown): void {
    if (!this.io) return;
    this.io.to(roomId).emit(event, data);
  }

  /**
   * Emit event to all connected clients
   */
  public broadcast(event: string, data: unknown): void {
    if (!this.io) return;
    this.io.emit(event, data);
  }

  /**
   * Get connected users count
   */
  public getConnectedCount(): number {
    return this.connectedUsers.size;
  }

  /**
   * Get all connected users
   */
  public getConnectedUsers(): SocketUser[] {
    return Array.from(this.connectedUsers.values());
  }

  /**
   * Check if user is connected
   */
  public isUserConnected(userId: string): boolean {
    return Array.from(this.connectedUsers.values()).some(
      user => user.userId === userId
    );
  }

  /**
   * Disconnect user by ID
   */
  public disconnectUser(userId: string): void {
    if (!this.io) return;

    const sockets = Array.from(this.connectedUsers.entries())
      .filter(([_, user]) => user.userId === userId)
      .map(([socketId]) => socketId);

    sockets.forEach(socketId => {
      this.io?.sockets.sockets.get(socketId)?.disconnect(true);
    });
  }

  /**
   * Get IO instance
   */
  public getIO(): Server | null {
    return this.io;
  }

  /**
   * Health check
   */
  public healthCheck(): { status: 'up' | 'down'; connections: number } {
    if (!this.io) {
      return { status: 'down', connections: 0 };
    }

    return {
      status: 'up',
      connections: this.getConnectedCount(),
    };
  }
}

export const socketService = SocketService.getInstance();
export default socketService;
