import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server.js';

describe('AI routes', () => {
  it('returns 401 when no token is provided', async () => {
    const res = await request(app).post('/api/ai/chat').send({});
    expect(res.status).toBe(401);
  });
});
