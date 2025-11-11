import { describe, it, expect, jest } from '@jest/globals';
import { getHealth } from '../../../controllers/index.js';

describe('Controllers - Index', () => {
    describe('getHealth', () => {
        it('debería retornar un objeto con status ok', () => {
            const req = {};
            const res = {
                json: jest.fn()
            };

            getHealth(req, res);

            expect(res.json).toHaveBeenCalledWith({
                status: 'ok',
                message: 'LTI ATS Backend está funcionando'
            });
        });
    });
});

