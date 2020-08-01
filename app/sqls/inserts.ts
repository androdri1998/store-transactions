import { databaseTables } from '../utils/configs';
import { IInsertsSqls } from './inserts-types';

const insertsSqls: IInsertsSqls = {
  INSERT_VERSION_MIGRATE: `INSERT INTO
    ${databaseTables.migrateVersions}(id, version, created_at) VALUES(?, ?, ?);`,
  INSERT_TRANSACTION: `INSERT INTO
    ${databaseTables.transactions}(id, title, type, value, created_at, updated_at)
    VALUES(?, ?, ?, ?, ?, ?);`,
};

export default insertsSqls;
