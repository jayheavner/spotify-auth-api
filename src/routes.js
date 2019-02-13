import AuthController from './controllers/AuthController';
import SonosController from './controllers/SonosController';

export default function (app) {
  app.get('/', function (req, res) {
    res.status(200).json({
      message: 'ok'
    })
  });

  app.get('/login', AuthController.login);
  app.get('/callback', AuthController.callback);
  app.get('/refresh_token', AuthController.refreshToken);
  app.get('/refreshToken', AuthController.refreshToken);
  app.post('/sonos-hook', SonosController.sonosHook);
  //app.get('/sonos', AuthController.sonos);
  app.get('*', AuthController.generic);
};
