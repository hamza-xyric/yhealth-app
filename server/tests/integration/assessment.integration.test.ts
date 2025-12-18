/**
 * Assessment API Integration Tests
 */

import request from 'supertest';
import { createApp } from '../../src/app.js';
import { createAuthenticatedUser, generateGoalData, generateAssessmentData } from '../helpers/testUtils.js';
import type { Application } from 'express';

describe('Assessment API Integration Tests', () => {
  let app: Application;
  let accessToken: string;
  let userId: string;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(async () => {
    const auth = await createAuthenticatedUser();
    accessToken = auth.accessToken;
    userId = auth.user._id.toString();
  });

  describe('Goal Categories', () => {
    describe('GET /api/assessment/goal-categories', () => {
      const endpoint = '/api/assessment/goal-categories';

      it('should return all goal categories', async () => {
        const response = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('categories');
        expect(Array.isArray(response.body.data.categories)).toBe(true);
        expect(response.body.data.categories.length).toBeGreaterThan(0);
      });

      it('should include category metadata', async () => {
        const response = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        const firstCategory = response.body.data.categories[0];
        expect(firstCategory).toHaveProperty('id');
        expect(firstCategory).toHaveProperty('name');
        expect(firstCategory).toHaveProperty('description');
        expect(firstCategory).toHaveProperty('pillar');
      });

      it('should require authentication', async () => {
        await request(app)
          .get(endpoint)
          .expect(401);
      });
    });
  });

  describe('User Goals', () => {
    describe('POST /api/assessment/goals', () => {
      const endpoint = '/api/assessment/goals';

      it('should create a new goal', async () => {
        const goalData = generateGoalData();

        const response = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(goalData)
          .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.category).toBe(goalData.category);
      });

      it('should validate required fields', async () => {
        const response = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({})
          .expect(400);

        expect(response.body.success).toBe(false);
      });

      it('should require authentication', async () => {
        await request(app)
          .post(endpoint)
          .send(generateGoalData())
          .expect(401);
      });
    });

    describe('GET /api/assessment/goals', () => {
      const endpoint = '/api/assessment/goals';

      it('should return user goals', async () => {
        // Create some goals first
        await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(generateGoalData());

        const response = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should return empty array for user with no goals', async () => {
        const response = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        expect(response.body.data).toEqual([]);
      });
    });

    describe('GET /api/assessment/goals/:goalId', () => {
      it('should return a specific goal', async () => {
        // Create a goal
        const createResponse = await request(app)
          .post('/api/assessment/goals')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(generateGoalData());

        const goalId = createResponse.body.data._id;

        const response = await request(app)
          .get(`/api/assessment/goals/${goalId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data._id).toBe(goalId);
      });

      it('should return 404 for non-existent goal', async () => {
        const response = await request(app)
          .get('/api/assessment/goals/000000000000000000000000')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(404);

        expect(response.body.success).toBe(false);
      });
    });

    describe('PATCH /api/assessment/goals/:goalId', () => {
      it('should update a goal', async () => {
        // Create a goal
        const createResponse = await request(app)
          .post('/api/assessment/goals')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(generateGoalData());

        const goalId = createResponse.body.data._id;

        const response = await request(app)
          .patch(`/api/assessment/goals/${goalId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ status: 'paused' })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.status).toBe('paused');
      });
    });
  });

  describe('Assessment Flow', () => {
    describe('POST /api/assessment/quick/start', () => {
      const endpoint = '/api/assessment/quick/start';

      it('should start quick assessment', async () => {
        const response = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ goalCategory: 'weight_loss' })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('assessmentId');
        expect(response.body.data).toHaveProperty('questions');
      });

      it('should require goal category', async () => {
        const response = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({})
          .expect(400);

        expect(response.body.success).toBe(false);
      });
    });

    describe('POST /api/assessment/quick/:assessmentId/submit', () => {
      it('should submit quick assessment responses', async () => {
        // Start assessment
        const startResponse = await request(app)
          .post('/api/assessment/quick/start')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ goalCategory: 'weight_loss' });

        const assessmentId = startResponse.body.data.assessmentId;

        const response = await request(app)
          .post(`/api/assessment/quick/${assessmentId}/submit`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({
            responses: [
              { questionId: 'q1', value: 'option1' },
              { questionId: 'q2', value: 5 },
            ],
          })
          .expect(200);

        expect(response.body.success).toBe(true);
      });
    });

    describe('POST /api/assessment/deep/start', () => {
      const endpoint = '/api/assessment/deep/start';

      it('should start deep assessment', async () => {
        const response = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ goalCategory: 'muscle_building' })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('assessmentId');
        expect(response.body.data).toHaveProperty('initialMessage');
      });
    });

    describe('POST /api/assessment/deep/:assessmentId/message', () => {
      it('should handle conversation message', async () => {
        // Start deep assessment
        const startResponse = await request(app)
          .post('/api/assessment/deep/start')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ goalCategory: 'stress_wellness' });

        const assessmentId = startResponse.body.data.assessmentId;

        const response = await request(app)
          .post(`/api/assessment/deep/${assessmentId}/message`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({
            message: 'I want to reduce my stress levels and sleep better',
          })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('response');
      });
    });

    describe('POST /api/assessment/switch-mode', () => {
      const endpoint = '/api/assessment/switch-mode';

      it('should switch from quick to deep mode', async () => {
        // Start quick assessment
        const startResponse = await request(app)
          .post('/api/assessment/quick/start')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ goalCategory: 'sleep_improvement' });

        const assessmentId = startResponse.body.data.assessmentId;

        const response = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({
            assessmentId,
            targetMode: 'deep',
          })
          .expect(200);

        expect(response.body.success).toBe(true);
      });
    });
  });
});
