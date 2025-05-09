import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import type { AuthenticatedUser } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
@Controller('v1/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login to the application' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto })
  login(@CurrentUser() user: AuthenticatedUser) {
    return this.authenticationService.login(user);
  }
}
