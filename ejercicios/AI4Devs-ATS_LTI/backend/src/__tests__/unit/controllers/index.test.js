import { describe, it, expect, jest } from '@jest/globals';
import { getHealthController } from '../../../controllers/index.js';

describe('Controllers - Index', () => {
    describe('getHealthController', () => {
        it('debería retornar un objeto con status ok', () => {
            const req = {};
            const res = {
                json: jest.fn()
            };

            getHealthController(req, res);

            expect(res.json).toHaveBeenCalledWith({
                status: 'ok',
                message: 'LTI ATS Backend está funcionando',
                timestamp: expect.any(String)
            });
        });
    });
});

