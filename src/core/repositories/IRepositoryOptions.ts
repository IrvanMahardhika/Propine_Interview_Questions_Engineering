import { Fn } from 'sequelize/types/lib/utils';

interface AttributesOptions {
  attributes?: (string | [string, string] | [Fn, string])[];
}

export interface WhereOptions {
  where?: any;
}

interface OrderOptions {
  order?: [[string, 'ASC' | 'DESC']];
}

interface GroupOptions {
  group?: string[];
}

interface OffsetOptions {
  offset?: number;
}

interface LimitOptions {
  limit?: number;
}

interface IncludeOptions
  extends AttributesOptions,
    WhereOptions,
    OrderOptions,
    GroupOptions {
  model?: string;
  as?: string;
  required?: boolean;
  include?: IncludeOptions[];
}

interface IRepositoryOptions
  extends AttributesOptions,
    WhereOptions,
    OrderOptions,
    GroupOptions,
    OffsetOptions,
    LimitOptions,
    IncludeOptions {}

export default IRepositoryOptions;
