import express from 'express';
import fs from 'fs';

import * as functions from 'firebase-functions';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(express.static('dist'));
app.use('/api/users', require('./users').default);
app.use('/api/code', require('./code').default);
app.use('/api/levels', require('./levels').default);
app.use('/api/classrooms', require('./classrooms').default);
app.use('/api/messaging', require('./messaging').default);

app.get('/api/blockly/initial', (req, res) => res.send(fs.readFileSync(`${__dirname}/assets/initial_toolbox.xml`)));
app.get('/api/ping', (req, res) => res.json({ ok: true }));


app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.statusCode ? err.statusCode : 500).json({ error: err.message });
});


if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
}

exports.app = functions.https.onRequest(app);
