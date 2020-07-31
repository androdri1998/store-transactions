import dotenv from 'dotenv';
import Helpers from '../../utils/Helpers';

import DatabaseRepository from '../../repositories/DatabaseRepository';

const HelpersInstance = new Helpers();
dotenv.config({
  path: HelpersInstance.getPathEnv(process.env.NODE_ENV as string),
});

export default async (tables: string[] = []): Promise<boolean> => {
  const DatabaseRepositoryInstance = new DatabaseRepository();
  await DatabaseRepositoryInstance.executeWithDatabase(async CONN => {
    await Promise.all(
      tables.map(async table => {
        const response = await DatabaseRepositoryInstance.truncateTable(
          CONN,
          table,
        );
        return response;
      }),
    );
    return true;
  });
  return true;
};
