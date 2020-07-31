import createsSqls from '../sqls/creates';
import altersSqls from '../sqls/alters';
import dropsSqls from '../sqls/drops';
import { databaseTables } from '../utils/configs';

const migrations = [
  {
    version: '1014ad50-fb90-43a0-a5d2-8901524b010d',
    up: [
      {
        script: createsSqls.CREATE_TABLE_MIGRATE_VERSIONS,
        description: `Create table ${databaseTables.migrateVersions}.`,
      },
    ],
    down: [
      {
        script: dropsSqls.DROP_TABLE_MIGRATE_VERSIONS,
        description: `Drop table ${databaseTables.migrateVersions}.`,
      },
    ],
  },
  {
    version: '26e02b2d-6dc3-45da-bf86-c95939c88aaf',
    up: [
      {
        script: createsSqls.CREATE_TABLE_TRANSACTIONS,
        description: `Create table ${databaseTables.transactions}.`,
      },
    ],
    down: [
      {
        script: dropsSqls.DROP_TABLE_TRANSACTIONS,
        description: `Drop table ${databaseTables.transactions}.`,
      },
    ],
  },
  {
    version: '8e196b28-e5d3-49be-a2d9-1cfdbde4d087',
    up: [
      {
        script: createsSqls.CREATE_TABLE_BALANCES,
        description: `Create table ${databaseTables.balances}.`,
      },
    ],
    down: [
      {
        script: dropsSqls.DROP_TABLE_BALANCES,
        description: `Drop table ${databaseTables.balances}.`,
      },
    ],
  },
];

export default migrations;
