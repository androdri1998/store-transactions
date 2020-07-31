import express, { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import moment from 'moment';
import HTTPStatusCode from 'http-status-codes';

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
      (req: Request, res: Response) => {
        const { title, value, type } = req.body;
        const createdAt = moment().utc().format('YYYY-DD-MM HH:mm:ss');
        const transactionId = uuidV4();
        const transaction = {
          id: transactionId,
          title,
          type,
          value,
          created_at: createdAt,
          updated_at: createdAt,
        };

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
