import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'email must be valid email',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    example: 'test123',
    minLength: 8,
    description:
      'password must be contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  readonly password: string;
}
