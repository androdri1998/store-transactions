/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TransactionsRepository from '../repositories/TransactionsRepository';

interface IResponseTransactions {
  id: string;
  title: string;
  type: string;
  value: number;
  created_at: Date;
  updated_at: Date;
}

export default class ListTransactionsService {
  private connection: any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(connection: any) {
    this.connection = connection;
  }

  public async execute(): Promise<IResponseTransactions[]> {
    const transactionsRepository = new TransactionsRepository(this.connection);
    const transactions = await transactionsRepository.all();

    return transactions.map(transaction => ({
      ...transaction,
      value: transaction.value / 100,
    }));
  }
}
