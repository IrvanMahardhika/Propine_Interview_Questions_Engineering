import IEntity from '../IEntity';

export default interface ITransaction extends IEntity {
  timestamp?: number;
  transaction_type?: string;
  token?: string;
  amount?: number;
}
