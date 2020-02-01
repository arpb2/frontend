import express from 'express';
import UserService from '../services/users';

const router = express.Router();

router.post('/signin', (req, res, next) => {
  UserService.signIn(req.body.email, req.body.password)
    .then(payload => res.json(payload))
    .catch(err => res.status(err.statusCode ? err.statusCode : 500).json({ error: err.message }));
});

export default router;
