import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../app.js';

const API_KEY = 'testkey';

test('GET /video/topics returns list of topics', async () => {
  const res = await request(app)
    .get('/video/topics')
    .set('X-API-KEY', API_KEY);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(res.body, ['Custom', 'History', 'Science', 'Art']);
});

test('POST /video/generate returns job status', async () => {
  const res = await request(app)
    .post('/video/generate')
    .set('X-API-KEY', API_KEY)
    .send({ topic: 'History', voice: 'Charlie', style: 'cinematic' });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, 'processing');
  assert.ok(res.body.vid);
});

