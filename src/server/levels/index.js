import express from 'express';
import LevelsService from '../services/levels';

const router = express.Router();

router.get('/', (req, res, next) => {
  LevelsService.getAll()
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  LevelsService.get(req.params.id)
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

export default router;
