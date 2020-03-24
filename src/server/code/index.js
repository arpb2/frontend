import express from 'express';
import CodeService from '../services/code';

const router = express.Router();

router.post('/', (req, res, next) => {
  CodeService.save(req.body.code, req.body.workspace, req.body.userId, req.body.levelId, req.header('Authorization'))
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

export default router;
