/* eslint-disable import/order */
/* eslint-disable import/first */
import dotenv from 'dotenv';
import Helpers from './utils/Helpers';

const HelpersInstance = new Helpers();
dotenv.config({
  path: HelpersInstance.getPathEnv(process.env.NODE_ENV as string),
});

import helmet from 'helmet';
import express, { Application } from 'express';
import cors from 'cors';
import 'express-async-errors';
import errorMiddleware from './middlewares/error-middleware';
import logRequests from './middlewares/logRequest';
import IndexRoutes from './routes/index';

class App {
  public express: Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.middlewaresErrors();
  }

  private middlewares(): void {
    this.express.use(logRequests);
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(helmet());
  }

  private routes(): void {
    const indexRoutes = new IndexRoutes();
    this.express.use('/', indexRoutes.routes);
  }

  private middlewaresErrors(): void {
    this.express.use(errorMiddleware());
  }
}

export default App;
