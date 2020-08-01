import { databaseTables } from '../utils/configs';
import { ISelectsSqls } from './selects-types';

const selectsSqls: ISelectsSqls = {
  SELECT_TABLE_MYSQL: `SELECT * FROM information_schema.tables WHERE table_name = ? LIMIT 1;`,
  SELECT_MIGRATE_VERSION: `
    SELECT version FROM ${databaseTables.migrateVersions} WHERE version = ?;
  `,
  SELECT_TRANSACTIONS: `
    SELECT * FROM ${databaseTables.transactions};
  `,
  SELECT_INCOME_BALANCE: `
    SELECT sum(value) total_income
      FROM ${databaseTables.transactions} WHERE type='income';
  `,
  SELECT_OUTCOME_BALANCE: `
    SELECT sum(value) total_outcome
      FROM ${databaseTables.transactions} WHERE type='outcome';
  `,
};

export default selectsSqls;
