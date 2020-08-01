import request from 'supertest';
import HTTPStatusCode from 'http-status-codes';

import App from '../App';
import truncateTables from './utils/truncateTables';

describe('Transactions', () => {
  beforeEach(async () => {
    await truncateTables(['transactions']);
  });

  it('Should be able to create a new transaction', async () => {
    const AppInstace = new App();
    const response = await request(AppInstace.express)
      .post('/transactions')
      .send({
        title: 'Salário',
        value: 3000,
        type: 'income',
      });
    expect(response.status).toBe(HTTPStatusCode.CREATED);
  });

  it('Should be able to to list the transaction', async () => {
    const AppInstace = new App();
    const response = await request(AppInstace.express).get('/transactions');
    expect(response.status).toBe(HTTPStatusCode.OK);
  });

  it('Should not be able to create outcome transaction without a valid balance', async () => {
    const AppInstace = new App();
    await request(AppInstace.express).post('/transactions').send({
      title: 'Salário',
      value: 3000,
      type: 'income',
    });
    const response = await request(AppInstace.express)
      .post('/transactions')
      .send({
        title: 'Dívidas',
        value: 3100,
        type: 'outcome',
      });
    expect(response.status).toBe(HTTPStatusCode.CONFLICT);
  });
});
