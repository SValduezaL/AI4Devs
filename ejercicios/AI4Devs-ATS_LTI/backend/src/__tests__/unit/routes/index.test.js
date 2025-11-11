import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import router from '../../../routes/index.js';

describe('Routes - Index', () => {
    const app = express();
    app.use(express.json());
    app.use('/api', router);

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

