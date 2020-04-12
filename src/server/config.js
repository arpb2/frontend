import { config as _config } from 'firebase-functions';
import { existsSync } from 'fs';

let config = _config().env;

if (process.env.NODE_ENV === 'firebase' || process.env.NODE_ENV !== 'production') {
  if (existsSync('./.env.json')) {
    const loadedconfig = require('./.env.json');

    config = { env: loadedconfig };

    console.log('in');

    console.log(config);
  }
}

export default config;
