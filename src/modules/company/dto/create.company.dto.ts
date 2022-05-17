import { IsNotEmpty, IsString, Length, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @ApiProperty({
    example: 'Orbitex',
    minLength: 1,
    maxLength: 100,
    description: 'Company Name',
  })
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @Length(2, 50)
  @ApiProperty({
    example: 3,
    description: 'Industry Id',
  })
  taxNumber: number;
}
