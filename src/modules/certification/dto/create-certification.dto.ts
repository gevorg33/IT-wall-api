import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCertificationDto {
  @IsOptional()
  @Length(0, 120)
  @IsString()
  @ApiPropertyOptional({
    example: 'Node JS Course',
    minLength: 0,
    maxLength: 120,
  })
  title: string;

  @IsOptional()
  @Length(0, 120)
  @IsString()
  @ApiPropertyOptional({
    example: 'ATM Web Training Center',
    minLength: 0,
    maxLength: 120,
  })
  companyName: string;

  @IsNotEmpty()
  @Length(0, 60)
  @IsString()
  @ApiProperty({
    example: 'Beginner',
    minLength: 0,
    maxLength: 60,
  })
  level: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: 'Date...' })
  issued: Date;
}
