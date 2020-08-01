import express, { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import validateRequestMiddleware from '../middlewares/validate-request-middleware';
import createTransaction from '../schemas/transactionsSchema';
import Transaction from '../models/Transaction';

class TransactionsRoutes {
  public routes: express.Router;

  constructor() {
    this.routes = express.Router();

    this.createRoutes();
  }

  private createRoutes(): void {
    this.routes.post(
      '/',
      validateRequestMiddleware(createTransaction, 'body'),
      (req: Request, res: Response) => {
        const { title, value, type } = req.body;

        const transaction = new Transaction({
          title,
          type,
          value,
        });

        return res.status(HTTPStatusCode.CREATED).json(transaction);
      },
    );
    this.routes.get('/', (req: Request, res: Response) => {
      return res
        .status(HTTPStatusCode.OK)
        .json({ transactions: [], balance: {} });
    });
  }
}

export default TransactionsRoutes;
