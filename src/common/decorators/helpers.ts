import { Filtering } from './filtering-params.decorator';
import { Sorting } from './sorting-params.decorator';
import { FilterRule } from './filtering-params.decorator';
import { Raw } from 'typeorm';

export const getOrder = (sort: Sorting) =>
  sort ? { [sort.property]: sort.direction } : {};

export const getWhere = (filter: Filtering) => {
  if (!filter) return {};
  if (filter.rule == FilterRule.SEARCH) {
    return {
      [filter.property]: Raw((alias) => `similarity(${alias}, :value) > 0.1`, {
        [filter.property]: filter.value,
      }),
    };
  }
  return {};
};
