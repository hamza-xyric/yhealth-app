import { createServer } from "http";
import cluster from "cluster";
import os from "os";

import { app } from "./app.js";
import { env } from "./config/env.config.js";
import { database } from "./config/database.config.js";
import { logger } from "./services/logger.service.js";
import { socketService } from "./services/socket.service.js";

const numCPUs = os.cpus().length;
const ENABLE_CLUSTERING =
  env.isProduction && process.env["CLUSTER_MODE"] === "true";

/**
 * Graceful shutdown handler
 */
async function gracefulShutdown(signal: string): Promise<void> {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  const shutdownTimeout = setTimeout(() => {
    logger.error("Shutdown timeout reached. Forcing exit.");
    process.exit(1);
  }, 30000); // 30 second timeout

  try {
    // Stop accepting new connections
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      logger.info("HTTP server closed");
    }

    // Disconnect from database
    await database.disconnect();
    logger.info("Database disconnected");

    clearTimeout(shutdownTimeout);
    logger.info("Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    clearTimeout(shutdownTimeout);
    logger.error("Error during shutdown", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    process.exit(1);
  }
}

/**
 * Start the server
 */
async function startServer(): Promise<void> {
  try {
    // Connect to database
    await database.connect();

    // Create HTTP server
    const httpServer = createServer(app);

    // Initialize Socket.IO
    socketService.initialize(httpServer);

    // Start listening
    httpServer.listen(env.port, env.host, () => {
      logger.info(`Server started`, {
        port: env.port,
        host: env.host,
        environment: env.nodeEnv,
        pid: process.pid,
        nodeVersion: process.version,
      });

      if (env.isDevelopment) {
        logger.info(
          `API available at http://localhost:${env.port}${env.api.prefix}`
        );
        logger.info(
          `Health check at http://localhost:${env.port}${env.api.prefix}/health`
        );
      }
    });

    // Store server reference for graceful shutdown
    global.server = httpServer;

    // Handle server errors
    httpServer.on("error", (error: NodeJS.ErrnoException) => {
      if (error.syscall !== "listen") {
        throw error;
      }

      switch (error.code) {
        case "EACCES":
          logger.error(`Port ${env.port} requires elevated privileges`);
          process.exit(1);
          break;
        case "EADDRINUSE":
          logger.error(`Port ${env.port} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
  } catch (error) {
    logger.error("Failed to start server", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    process.exit(1);
  }
}

// Server reference for graceful shutdown
let server: ReturnType<typeof createServer> | undefined;

// Cluster mode for production
if (ENABLE_CLUSTERING && cluster.isPrimary) {
  logger.info(`Primary ${process.pid} is running`);
  logger.info(`Forking ${numCPUs} workers...`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit
  cluster.on("exit", (worker, code, signal) => {
    logger.warn(`Worker ${worker.process.pid} died`, { code, signal });

    // Replace dead worker
    if (!signal) {
      logger.info("Starting a new worker...");
      cluster.fork();
    }
  });

  // Handle worker online
  cluster.on("online", (worker) => {
    logger.info(`Worker ${worker.process.pid} is online`);
  });
} else {
  // Single process mode (development) or worker process
  startServer();

  // Graceful shutdown handlers
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
}

// Extend global type for server reference
declare global {
  // eslint-disable-next-line no-var
  var server: ReturnType<typeof createServer> | undefined;
}

export { startServer };
