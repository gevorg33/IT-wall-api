import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
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
  @ApiProperty({ example: '+37477889900' })
  phoneNumber: string;
}
