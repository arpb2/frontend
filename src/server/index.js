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

app.get('/api/blockly/initial', (req, res) => res.send(fs.readFileSync(`${__dirname}/assets/initial_toolbox.xml`)));


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
