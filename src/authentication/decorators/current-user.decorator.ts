import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser } from '../authentication.service';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: AuthenticatedUser }>();
    if (!request.user) {
      throw new InternalServerErrorException('Unable to find user');
    }
    return request.user;
  },
);
