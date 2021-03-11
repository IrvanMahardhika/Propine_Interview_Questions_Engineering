import { FindOptions, IncludeOptions, WhereOptions, Op } from 'sequelize';
import IEntity from '@core/entities/IEntity';
import IRepository from '@core/repositories/IRepository';
import IRepositoryOptions from '@core/repositories/IRepositoryOptions';
import models from '@infras/database/sequelize/models';

export const modelFinder = (modelName: string): IRepository<IEntity> | null => {
  return models[modelName];
};

const whereOptionsConverter = (whereOptions: any): WhereOptions => {
  const whereOptionsConverted: WhereOptions = {};

  Object.keys(whereOptions).forEach((key) => {
    const selectedOption = whereOptions[key];
    if (typeof selectedOption === 'object') {
      const selectedOptionOperator = Object.keys(selectedOption)[0];
      const selectedOptionValues = selectedOption[selectedOptionOperator];
      const operator = Op[selectedOptionOperator];

      if (operator) {
        whereOptionsConverted[key] = {
          [operator]:
            selectedOptionValues === undefined ? null : selectedOptionValues,
        };

        return;
      }
    }

    whereOptionsConverted[key] = selectedOption;
  });

  return whereOptionsConverted;
};

const includeOptionsConverter = (includeOption: any): IncludeOptions => {
  const { model = '', where, include: childInclude } = includeOption;
  const selectedModel = modelFinder(model);
  const childIncludeOptions: IncludeOptions[] = [];

  let whereOptions: WhereOptions;
  if (where && Object.keys(where).length > 0) {
    whereOptions = whereOptionsConverter(where);
  }

  if (childInclude && Array.isArray(childInclude)) {
    childInclude.forEach((child) => {
      childIncludeOptions.push(includeOptionsConverter(child));
    });
  }

  return {
    ...includeOption,
    model: selectedModel,
    where: whereOptions,
    include: childIncludeOptions || [],
  };
};

export const repositoryOptionConverter = (
  options: IRepositoryOptions,
): FindOptions => {
  let includeOptions: IncludeOptions[] = [];
  let whereOptions: WhereOptions;
  const { where, include, model, ...restOptions } = options || {};

  // convert include options
  if (Array.isArray(include) && include.length > 0) {
    includeOptions = include.map((includeData: any = {}) => {
      return includeOptionsConverter(includeData);
    });
  }

  // convert where options
  if (where && Object.keys(where).length > 0) {
    whereOptions = whereOptionsConverter(where);
  }

  return {
    ...restOptions,
    where: whereOptions,
    include: includeOptions,
  };
};
