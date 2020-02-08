import express from 'express';
import CodeService from '../services/code';

const router = express.Router();

router.post('/save', (req, res, next) => {
  CodeService.save(req.body.code, req.body.workspace, req.body.userId)
    .then(payload => res.json(payload))
    .catch(err => res.status(err.statusCode ? err.statusCode : 500).json({ error: err.message }));
});

export default router;
