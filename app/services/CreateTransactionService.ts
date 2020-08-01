/* eslint-disable @typescript-eslint/no-explicit-any */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

enum EType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

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
    const typeTransaction =
      type.toUpperCase() === EType.INCOME ? EType.INCOME : EType.OUTCOME;
    const transaction = await transactionsRepository.create({
      title,
      value,
      type: typeTransaction,
    });

    return transaction;
  }
}
