import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('GamesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) should return API info', async () => {
    const res = await request(app.getHttpServer()).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      'message',
      'Welcome to a itch.io alternative API',
    );
    expect(res.body).toHaveProperty('routes');
  });

  const validTypes = ['horror', '3d', 'retro', 'psx'];

  it.each(validTypes)('/newest/:type GET with valid type %s', async (type) => {
    const res = await request(app.getHttpServer()).get(`/newest/${type}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('type', 'newest');
    expect(res.body).toHaveProperty('genre', type);
    expect(res.body).toHaveProperty('games');
  });

  it('/newest/:type (GET) with invalid type', async () => {
    const res = await request(app.getHttpServer()).get('/newest/invalidtype');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid type');
  });

  it.each(validTypes)(
    '/new-and-popular/:type GET with valid type %s',
    async (type) => {
      const res = await request(app.getHttpServer()).get(
        `/new-and-popular/${type}`,
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('type', 'new-and-popular');
      expect(res.body).toHaveProperty('genre', type);
      expect(res.body).toHaveProperty('games');
    },
  );

  it.each(validTypes)(
    '/top-sellers/:type GET with valid type %s',
    async (type) => {
      const res = await request(app.getHttpServer()).get(
        `/top-sellers/${type}`,
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('type', 'top-sellers');
      expect(res.body).toHaveProperty('genre', type);
      expect(res.body).toHaveProperty('games');
    },
  );

  it.each(validTypes)(
    '/top-rated/:type GET with valid type %s',
    async (type) => {
      const res = await request(app.getHttpServer()).get(`/top-rated/${type}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('type', 'top-rated');
      expect(res.body).toHaveProperty('genre', type);
      expect(res.body).toHaveProperty('games');
    },
  );

  it('/search?q=... (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/search?q=horror');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('type', 'search');
    expect(res.body).toHaveProperty('query', 'horror');
    expect(res.body).toHaveProperty('games');
  });
});
