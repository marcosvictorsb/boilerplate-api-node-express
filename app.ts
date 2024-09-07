import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from './cors';
import routers from './src/config/routers';

const app: Express = express();


app.options('*', cors);
app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routers(app);

export default app;


