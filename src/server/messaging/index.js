import express from 'express';
import * as admin from 'firebase-admin';
import parseXML from '../parser/parser';

const router = express.Router();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

router.post('/', (req, res, next) => {
  const parsedCode = parseXML(atob(req.body.message));

  const message = {
    token: req.body.to,
    notification: {
      title: 'ARPB2',
      body: 'You have new messages!',
    },
    data: parsedCode,
  };
  admin.messaging().send(message)
    .then(response => console.log('Message sent'))
    .catch((error) => {
      console.log('Error sending message:', error);
    });
});

export default router;
