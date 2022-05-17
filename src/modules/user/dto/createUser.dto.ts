import {
  IsEmail,
  IsNotEmpty,
  Matches,
  IsPhoneNumber,
  IsString,
  MinLength,
  Length,
  IsInt,
} from 'class-validator';
import { Match } from '../../../decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCompanyDto } from '../../company/dto/create.company.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  @Matches(/^[a-zA-Z]*$/, {
    message: 'firstName must be contain only letters',
  })
  @ApiProperty({
    example: 'Jon',
    minLength: 2,
    maxLength: 30,
    description: 'firstName must be contain only letters',
  })
  firstName: string;

  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  @Matches(/^[a-zA-Z]*$/, {
    message: 'lastName must be contain only letters',
  })
  @ApiProperty({
    example: 'Doe',
    minLength: 2,
    maxLength: 30,
    description: 'lastName must be contain only letters',
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  @ApiProperty({ example: '+37477889900', description: 'phone number' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'email must be valid email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'password must be contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @ApiProperty({
    example: 'test123',
    minLength: 8,
    description:
      'password must be contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;

  @IsNotEmpty()
  @Match('password')
  @ApiProperty({ example: 'test123' })
  confirmPassword: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 2 })
  roleId: number;

  @ApiProperty()
  company?: CreateCompanyDto;
}
