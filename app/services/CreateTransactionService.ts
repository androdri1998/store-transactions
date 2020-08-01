/* eslint-disable @typescript-eslint/no-explicit-any */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { CustomConflictError } from '../utils/Errors';

interface IExecuteDTO {
  title: string;
  type: string;
  value: number;
}

export default class CreateTransactionService {
  private connection: any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(connection: any) {
    this.connection = connection;
  }

  public async execute({
    title,
    type,
    value,
  }: IExecuteDTO): Promise<Transaction> {
    const transactionsRepository = new TransactionsRepository(this.connection);
    const typeTransaction = type === 'income' ? 'income' : 'outcome';

    const totalBalance = await transactionsRepository.getTotalBalance();
    const hasMoney = totalBalance - value * 100;
    if (hasMoney < 0 && type === 'outcome') {
      throw new CustomConflictError('No have money enough to this transaction');
    }
    const transaction = await transactionsRepository.create({
      title,
      value,
      type: typeTransaction,
    });

    return transaction;
  }
}
