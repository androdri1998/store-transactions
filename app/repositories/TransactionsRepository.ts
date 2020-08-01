/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Transaction from '../models/Transaction';
import DatabaseRepository from './DatabaseRepository';
import insertsSqls from '../sqls/inserts';
import selectsSqls from '../sqls/selects';

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

export default class TransactionsRepository {
  private connection: any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(connection: any) {
    this.connection = connection;
  }

  // eslint-disable-next-line class-methods-use-this
  public async create({
    title,
    type,
    value,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const databaseRepository = new DatabaseRepository(this.connection);
    const transaction: Transaction = new Transaction({ title, type, value });
    await databaseRepository.query(insertsSqls.INSERT_TRANSACTION, [
      transaction.id,
      transaction.title,
      transaction.type,
      transaction.value,
      transaction.createdAt,
      transaction.updatedAt,
    ]);

    return transaction;
  }

  // eslint-disable-next-line class-methods-use-this
  public async all(): Promise<IResponseTransactions[]> {
    const databaseRepository = new DatabaseRepository(this.connection);
    const transactions: IResponseTransactions[] = await databaseRepository.query(
      selectsSqls.SELECT_TRANSACTIONS,
    );

    return transactions;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getTotalIncome(): Promise<number> {
    const databaseRepository = new DatabaseRepository(this.connection);
    const [{ total_income }] = await databaseRepository.query(
      selectsSqls.SELECT_INCOME_BALANCE,
    );

    return total_income || 0;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getTotalOutcome(): Promise<number> {
    const databaseRepository = new DatabaseRepository(this.connection);
    const [{ total_outcome }] = await databaseRepository.query(
      selectsSqls.SELECT_OUTCOME_BALANCE,
    );

    return total_outcome || 0;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getTotalBalance(): Promise<number> {
    const databaseRepository = new DatabaseRepository(this.connection);
    const [{ total_outcome }] = await databaseRepository.query(
      selectsSqls.SELECT_OUTCOME_BALANCE,
    );
    const [{ total_income }] = await databaseRepository.query(
      selectsSqls.SELECT_INCOME_BALANCE,
    );

    const totalBalance = (total_income || 0) - (total_outcome || 0);

    return totalBalance;
  }
}
