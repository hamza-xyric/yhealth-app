/**
 * Health Check API Integration Tests
 */

import request from 'supertest';
import { createApp } from '../../src/app.js';
import type { Application } from 'express';

describe('Health Check API Integration Tests', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  describe('GET /api/health', () => {
    const endpoint = '/api/health';

    it('should return health status', async () => {
      const response = await request(app)
        .get(endpoint)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('status');
      expect(response.body.data).toHaveProperty('timestamp');
      expect(response.body.data).toHaveProperty('uptime');
    });

    it('should include services status', async () => {
      const response = await request(app)
        .get(endpoint)
        .expect(200);

      expect(response.body.data).toHaveProperty('services');
      expect(response.body.data.services).toHaveProperty('database');
      expect(response.body.data.services).toHaveProperty('cache');
    });

    it('should include memory usage', async () => {
      const response = await request(app)
        .get(endpoint)
        .expect(200);

      expect(response.body.data).toHaveProperty('memory');
      expect(response.body.data.memory).toHaveProperty('used');
      expect(response.body.data.memory).toHaveProperty('total');
      expect(response.body.data.memory).toHaveProperty('percentage');
    });
  });

  describe('GET /api/health/live', () => {
    const endpoint = '/api/health/live';

    it('should return liveness status', async () => {
      const response = await request(app)
        .get(endpoint)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('status', 'alive');
    });
  });

  describe('GET /api/health/ready', () => {
    const endpoint = '/api/health/ready';

    it('should return readiness status', async () => {
      const response = await request(app)
        .get(endpoint)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('status');
    });
  });

  describe('GET / (Root endpoint)', () => {
    it('should return API info', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('status', 'running');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/api/unknown-route')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not found');
    });
  });
});
