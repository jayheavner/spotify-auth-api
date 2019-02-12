import express from 'express';
import config from '../config';
import middleware from './middleware';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || config.port;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.listen(port);

middleware(app, express);

routes(app);

console.log(`Listen on port: ${port}`);
