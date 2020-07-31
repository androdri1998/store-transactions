import { databaseTables } from '../utils/configs';
import { IDropsSqls } from './drops-types';

const dropsSqls: IDropsSqls = {
  DROP_TABLE_MIGRATE_VERSIONS: `
    DROP TABLE ${databaseTables.migrateVersions};
  `,
  DROP_TABLE_BALANCES: `
    DROP TABLE ${databaseTables.balances};
  `,
  DROP_TABLE_TRANSACTIONS: `
    DROP TABLE ${databaseTables.transactions};
  `,
};

export default dropsSqls;
