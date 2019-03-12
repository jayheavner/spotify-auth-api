import express from 'express';
import bodyParser from 'body-parser';
import tcpPortUsed from 'tcp-port-used';
import portscanner from 'portscanner';
import config from '../config';
import middleware from './middleware';
import routes from './routes';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

const app = express();
const port = process.env.PORT || config.port;

(async () => {
  console.log('Checking port 4040');

  try {
    const portStatus = await tcpPortUsed.check(4040, '0.0.0.0');
    console.log(`port ${port} open: ${portStatus}`);
    if (portStatus) {
      console.log('use the following commands to find and kill the processes');
      console.log('netstat -ano | findstr :4040');
      console.log('taskkill /PID {id} /F');
      const free = await tcpPortUsed.waitUntilFree(4040, 200, 1000 * 60);
      console.log(`Port ${port} is now free.`);
    }
    resume();
  } catch (err) {
    console.error('Error on check:', err.message);
  }
})();

const resume = () => {
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

  app.listen(port);

  middleware(app, express);

  routes(app);

  console.log(`Listen on port: ${port}`);
};
