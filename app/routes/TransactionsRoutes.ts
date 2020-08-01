import express, { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import TransactionController from '../controllers/TransactionController';

import validateRequestMiddleware from '../middlewares/validate-request-middleware';
import createTransaction from '../schemas/transactionsSchema';

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
      async (req: Request, res: Response) => {
        const { title, value, type } = req.body;

        const transactionController = new TransactionController();
        const transaction = await transactionController.createTransaction({
          title,
          value,
          type,
        });

        return res.status(HTTPStatusCode.CREATED).json(transaction);
      },
    );
    this.routes.get('/', async (req: Request, res: Response) => {
      const transactionController = new TransactionController();
      const transactions = await transactionController.listTransactions();

      return res.status(HTTPStatusCode.OK).json({ transactions, balance: {} });
    });
  }
}

export default TransactionsRoutes;
