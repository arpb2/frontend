import express from 'express';
import { userInfo } from 'os';
import fs from 'fs';

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: userInfo.username }));
app.get('/api/blockly/initial', (req, res) => res.send(fs.readFileSync(`${__dirname}/assets/initial_toolbox.xml`)));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
