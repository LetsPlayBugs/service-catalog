import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export interface Sorting {
  property: string;
  direction: 'ASC' | 'DESC';
}

export const SortingParams = createParamDecorator(
  (validParams: unknown[], ctx: ExecutionContext): Sorting => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) return { property: 'name', direction: 'ASC' };

    // check the format of the sort query param
    const sortPattern = /^([a-zA-Z0-9]+):(ASC|DESC|asc|desc)$/;
    if (!sort.match(sortPattern))
      throw new BadRequestException('Invalid sort parameter');

    // extract the property name and direction and check if they are valid
    const [property, direction] = sort.split(':');

    const lowerCaseProperty = property.toLowerCase();
    const upperCaseDirection = direction.toUpperCase();

    if (!validParams.includes(lowerCaseProperty))
      throw new BadRequestException(`Invalid sort property: ${property}`);
    if (
      upperCaseDirection !== 'ASC' &&
      upperCaseDirection !== 'DESC'
    )
      throw new BadRequestException(`Invalid sort direction: ${direction}`);

    return {
      property: lowerCaseProperty as Sorting['property'],
      direction: upperCaseDirection as Sorting['direction'],
    };
  },
);
