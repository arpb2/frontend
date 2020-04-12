import { config as _config } from 'firebase-functions';
import { existsSync } from 'fs';

let config = _config().env;

if (process.env.NODE_ENV === 'firebase' || process.env.NODE_ENV === 'development') {
  if (existsSync('./.env.json')) {
    const loadedconfig = require('./.env.json');

    config = loadedconfig;
  }
}

console.log('config');
console.log(config);


export default config;
