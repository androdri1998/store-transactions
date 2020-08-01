import express from 'express';

import TransactionsRoutes from './TransactionsRoutes';

class IndexRoutes {
  public routes: express.Router;

  constructor() {
    this.routes = express.Router();

    this.createRoutes();
  }

  private createRoutes(): void {
    const transactionsRoutes = new TransactionsRoutes();
    this.routes.use('/transactions', transactionsRoutes.routes);
  }
}

export default IndexRoutes;
