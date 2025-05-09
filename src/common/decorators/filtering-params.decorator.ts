import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  NotImplementedException,
} from '@nestjs/common';
import { Request } from 'express';

export interface Filtering {
  property: string;
  rule: string;
  value: string;
}

// valid filter rules
export enum FilterRule {
  SEARCH = 'search',
}

export const FilteringParams = createParamDecorator(
  (data: unknown[], ctx: ExecutionContext): Filtering | null => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filter = req.query.filter as string;
    if (!filter) return null;
    if (!data)
      throw new NotImplementedException(
        'Filtering is not supported on this api',
      );

    // validate the format of the filter
    if (!filter.match(/^[a-zA-Z0-9_]+:(search)+:.+$/)) {
      throw new BadRequestException('Invalid filter parameter');
    }

    // extract the parameters and validate if the rule and the property are valid
    const [property, rule, value] = filter.split(':');
    if (!data.includes(property))
      throw new BadRequestException(`Invalid filter property: ${property}`);
    if (!Object.values(FilterRule).includes(rule as FilterRule))
      throw new BadRequestException(`Invalid filter rule: ${rule}`);
    return { property, rule, value };
  },
);
