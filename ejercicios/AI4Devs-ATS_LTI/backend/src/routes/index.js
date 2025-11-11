import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Rutas de LTI ATS' });
});

export default router;


