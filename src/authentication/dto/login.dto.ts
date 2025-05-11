import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the user',
    example: 'kevin@workstream.is',
  })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The password of the user', example: 'password' })
  password!: string;
}
