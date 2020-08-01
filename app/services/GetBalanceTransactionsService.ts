/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TransactionsRepository from '../repositories/TransactionsRepository';

interface IResponseBalanceTransactions {
  income: number;
  outcome: number;
  total: number;
}

export default class GetBalanceTransactionsService {
  private connection: any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(connection: any) {
    this.connection = connection;
  }

  public async execute(): Promise<IResponseBalanceTransactions> {
    const transactionsRepository = new TransactionsRepository(this.connection);
    const totalIncome = await transactionsRepository.getTotalIncome();
    const totalOutcome = await transactionsRepository.getTotalOutcome();

    const totalBalance = totalIncome - totalOutcome;
    const responseBalance: IResponseBalanceTransactions = {
      income: totalIncome / 100,
      outcome: totalOutcome / 100,
      total: totalBalance / 100,
    };
    return responseBalance;
  }
}
