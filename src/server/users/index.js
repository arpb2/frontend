import express from 'express';
import UserService from '../services/users';

const router = express.Router();

router.post('/signin', (req, res, next) => {
  UserService.signIn(req.body.email, req.body.password)
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  UserService.create(req.body.firstName, req.body.lastName,
    req.body.password, req.body.email, req.body.userType, req.body.webToken, req.body.deviceToken)
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

router.get('/:id/code', (req, res, next) => {
  UserService.getCodes(req.params.id, req.headers.authorization)
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  UserService.get(req.params.id, req.headers.authorization)
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  UserService.update(req.params.id, req.headers.authorization, req.body)
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

export default router;
