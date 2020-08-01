import { databaseTables } from '../utils/configs';
import { ICreatesSqls } from './creates-types';

const createSqls: ICreatesSqls = {
  CREATE_TABLE_MIGRATE_VERSIONS: `
    CREATE TABLE ${databaseTables.migrateVersions}(
      id VARCHAR(36) PRIMARY KEY,
      version VARCHAR(36) NOT NULL,
      created_at DATETIME NOT NULL
    );
  `,
  CREATE_TABLE_TRANSACTIONS: `
    CREATE TABLE ${databaseTables.transactions}(
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      type ENUM('income','outcome') NOT NULL,
      value INT NOT NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
    );
  `,
};

export default createSqls;
