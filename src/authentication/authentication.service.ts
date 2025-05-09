import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Service } from '../services/entities/service.entity';

export type AuthenticatedUser = {
  email: string;
  services: Service[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  public async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    // in reality, this would not be a direct comparison and I would not store passwords in plain text.
    // Passwords are one way salted, hashed and the hashes are compared (bycrpt).
    // I would also implement measures against timing attacks, and password spraying.
    if (user && password === user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public login(user: Awaited<ReturnType<typeof this.validateUser>>) {
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
