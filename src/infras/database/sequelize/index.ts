import { Sequelize } from 'sequelize';
import models from './models';
import initializations from './initialization';

export default class DB {
  private static sequelize: Sequelize;

  static async initialize(config?): Promise<void> {
    try {
      if (!DB.sequelize) {
        const { database, username, password, port, host, dialect } =
          config || {};
        this.sequelize = new Sequelize({
          database,
          username,
          password,
          port,
          host,
          dialect,
          logging: false,
        });
        await this.sequelize.authenticate();

        console.log('Connection to DB has been established.');
      }

      initializations.forEach(({ init }) => {
        init(this.sequelize);
      });

      initializations.forEach(({ applyRelations }) => {
        applyRelations(models);
      });

      console.log('Model initialization has been completed.');
    } catch (error) {
      console.log('Unable to connect to the database: ', error);
      throw error;
    }
  }

  static getSequelizeInstance(): Sequelize {
    return this.sequelize;
  }

  /**
   * Only use this method to reset sequelize instance forcefully
   * @param newInstance New sequelize instance
   */
  static setSequelizeInstance(newInstance: Sequelize): void {
    this.sequelize = newInstance;
  }
}
