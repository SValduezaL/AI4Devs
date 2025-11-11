import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../index.js';

describe('API Integration Tests', () => {
    describe('GET /', () => {
        it('debería retornar un mensaje de bienvenida', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('LTI ATS Backend API');
        });

        it('debería retornar Content-Type application/json', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);

            expect(response.headers['content-type']).toMatch(/json/);
        });
    });

    describe('GET /api', () => {
        it('debería retornar un mensaje de rutas', async () => {
            const response = await request(app)
                .get('/api')
                .expect(200);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Rutas de LTI ATS');
        });
    });
});

