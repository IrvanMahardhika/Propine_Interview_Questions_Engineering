import { Model, Sequelize, DataTypes } from 'sequelize';
import ITransaction from '@core/entities/transaction/ITransaction';
import IModelSet from '../IModelSet';

export class Transaction extends Model implements ITransaction {
  id: number;

  timestamp: number;

  transaction_type: string;

  token: string;

  amount: number;
}

const init = (sequelize: Sequelize): void => {
  Transaction.init(
    {
      timestamp: {
        type: DataTypes.BIGINT,
      },
      transaction_type: {
        type: DataTypes.TEXT,
      },
      token: {
        type: DataTypes.TEXT,
      },
      amount: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      tableName: 'transactions',
    },
  );
};

const applyRelations = (models: IModelSet): void => {
  // apply relations here
};

export const TransactionInitialization = {
  init,
  applyRelations,
};
