import ITransaction from './ITransaction';

export default class Transaction implements ITransaction {
  id?: number;

  timestamp?: number;

  transaction_type?: string;

  token?: string;

  amount?: number;
}
