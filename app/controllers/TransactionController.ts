/* eslint-disable camelcase */
import Database from '../database/Database';
import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionsService from '../services/ListTransactionsService';
import GetBalanceTransactionsService from '../services/GetBalanceTransactionsService';
import Transaction from '../models/Transaction';

interface ICreateTransactionDTO {
  title: string;
  type: string;
  value: number;
}

interface IResponseTransactions {
  id: string;
  title: string;
  type: string;
  value: number;
  created_at: Date;
  updated_at: Date;
}

interface IResponseBalanceTransactions {
  income: number;
  outcome: number;
  total: number;
}

class TransactionController {
  // eslint-disable-next-line class-methods-use-this
  public async createTransaction({
    title,
    value,
    type,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const database = new Database();
    const responseFunction = await database.executeWithDatabase(async CONN => {
      const createTransactionService = new CreateTransactionService(CONN);
      const transaction: Transaction = await createTransactionService.execute({
        title,
        type,
        value,
      });
      return transaction;
    });

    return responseFunction;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getBalanceTransactions(): Promise<IResponseBalanceTransactions> {
    const database = new Database();
    const responseFunction = await database.executeWithDatabase(async CONN => {
      const getBalanceTransactionsService = new GetBalanceTransactionsService(
        CONN,
      );
      const balanceTransactions = await getBalanceTransactionsService.execute();
      return balanceTransactions;
    });

    return responseFunction;
  }

  // eslint-disable-next-line class-methods-use-this
  public async listTransactions(): Promise<IResponseTransactions[]> {
    const database = new Database();
    const responseFunction = await database.executeWithDatabase(async CONN => {
      const listTransactionsService = new ListTransactionsService(CONN);
      const transactions: IResponseTransactions[] = await listTransactionsService.execute();
      return transactions;
    });

    return responseFunction;
  }
}

export default TransactionController;
