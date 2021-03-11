import IEntity from '@core/entities/IEntity';
import IRepositoryOptions from './IRepositoryOptions';

export default interface IRepository<Entity extends IEntity> {
  findOne: (options?: IRepositoryOptions) => Promise<Entity>;
  findAll: (options?: IRepositoryOptions) => Promise<Entity[]>;
}
