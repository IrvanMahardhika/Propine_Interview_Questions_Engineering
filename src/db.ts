import NewDB from '@infras/database/sequelize';
import { sequelize } from './models';

export default class DB {
  static async initialize(): Promise<void> {
    try {
      await sequelize.authenticate({ logging: false });

      NewDB.setSequelizeInstance(sequelize);
      await NewDB.initialize();

      console.log('Connection to DB has been established successfully.');
    } catch (error) {
      console.log('Unable to connect to the database:', error);
    }
  }
}
