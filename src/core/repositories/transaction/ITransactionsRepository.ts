import Transaction from '@core/entities/transaction/Transaction';
import IRepository from '../IRepository';

export default interface ITransactionRepository
  extends IRepository<Transaction> {}
