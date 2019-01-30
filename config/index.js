import local from './local';
import prod from './prod';
import spotify from './spotify.env';
let config;

switch (process.env.NODE_ENV) {
  case 'local':
    config = local;
    break;

  default:
    config = prod;
}

export default {
  ...config,
  ...spotify
}
