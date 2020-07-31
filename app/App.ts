import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import Helpers from './utils/Helpers';

import errorMiddleware from './middlewares/error-middleware';
import TransactionsRoutes from './routes/TransactionsRoutes';

const HelpersInstance = new Helpers();
dotenv.config({
  path: HelpersInstance.getPathEnv(process.env.NODE_ENV as string),
});

class App {
  public express: Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.middlewaresErrors();
  }

  private middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(helmet());
  }

  private routes(): void {
    const TransactionsRoutesInstance = new TransactionsRoutes();
    this.express.use('/transactions', TransactionsRoutesInstance.routes);
  }

  private middlewaresErrors(): void {
    this.express.use(errorMiddleware());
  }
}

export default App;
