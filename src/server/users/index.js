import express from 'express';
import UserService from '../services/users';

const router = express.Router();

router.post('/signin', (req, res, next) => {
  UserService.signIn(req.body.email, req.body.password)
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  UserService.create(req.body.firstName, req.body.lastName, req.body.password, req.body.email)
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  UserService.get(req.params.id, req.headers.authorization)
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

export default router;
