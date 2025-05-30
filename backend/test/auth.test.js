import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../server.js';

describe('auth middleware', () => {
  it('returns 401 on protected route without token', async () => {
    const res = await request(app).get('/api/files');
    expect(res.statusCode).toBe(401);
  });
});
