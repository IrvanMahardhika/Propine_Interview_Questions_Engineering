import { Transaction as DBTransaction } from 'sequelize';
import Transaction from '@core/entities/transaction/Transaction';
import ITransactionsRepository from '@core/repositories/transaction/ITransactionsRepository';
import models from '@infras/database/sequelize/models';
import IRepositoryOptions from '@core/repositories/IRepositoryOptions';
import { repositoryOptionConverter } from '../helpers';

const { Transaction: TransactionModel } = models;

export default class AccountMasterRepository
  implements ITransactionsRepository {
  private transaction: DBTransaction;

  async findOne(options: IRepositoryOptions): Promise<Transaction> {
    const sequelizeOptions = repositoryOptionConverter(options);
    const transaction = await TransactionModel.findOne({
      ...sequelizeOptions,
      transaction: this.transaction,
    });

    return transaction && transaction.get({ plain: true });
  }

  async findAll(options: IRepositoryOptions): Promise<Transaction[]> {
    const sequelizeOptions = repositoryOptionConverter(options);
    const transactions = await TransactionModel.findAll({
      ...sequelizeOptions,
      transaction: this.transaction,
    });

    return transactions.map((transaction) => transaction.get({ plain: true }));
  }
}
