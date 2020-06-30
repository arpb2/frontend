import express from 'express';
import ClassroomService from '../services/classrooms';

const router = express.Router();

router.get('/:id', (req, res, next) => {
  ClassroomService.getById(req.params.id, req.header('Authorization'))
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  ClassroomService.updateClassroom(req.params.id, req.body, req.header('Authorization'))
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

router.post('/:id/students', (req, res, next) => {
  ClassroomService.addStudentByEmail(req.params.id, req.body.email, req.header('Authorization'))
    .then(payload => res.json(payload))
    .catch(err => next(err));
});

export default router;
