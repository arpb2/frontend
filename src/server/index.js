import express from 'express';
import fs from 'fs';

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

app.get('/api/blockly/initial', (req, res) => res.send(fs.readFileSync(`${__dirname}/assets/initial_toolbox.xml`)));

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.statusCode ? err.statusCode : 500).json({ error: err.message });
});

// eslint-disable-next-line no-console
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
