import { AuthGuard } from '@nestjs/passport';

// It is necessary to extend the AuthGuard to prevent "magic strings"
// https://docs.nestjs.com/recipes/passport
export class LocalAuthGuard extends AuthGuard('local') {}
