import { Transaction } from 'sequelize';
import sequelize from '../infra/database/connection/mysql';

export interface ITransactionMixin {
  begin(): Promise<Transaction>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export function TransactionMixin<T extends new (...args: any[]) => {}>(Base: T) {
  return class extends Base {
    private transaction: Transaction | null = null;

    constructor(...args: any[]) {
      super(...args);
    }

    async begin(): Promise<Transaction> {
      this.transaction = await sequelize.transaction();
      return this.transaction as Transaction;
    }

    async commit(): Promise<void> {
      if (this.transaction) {
        await this.transaction.commit();
        this.transaction = null;
      } else {
        throw new Error('No transaction to commit.');
      }
    }

    async rollback(): Promise<void> {
      if (this.transaction) {
        await this.transaction.rollback();
        this.transaction = null;
      } else {
        throw new Error('No transaction to rollback.');
      }
    }

    getTransaction(): Transaction {
      if (!this.transaction) {
        throw new Error('No active transaction.');
      }
      return this.transaction;
    }
  };
}
