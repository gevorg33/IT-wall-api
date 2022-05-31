import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrUpdateWorkExperienceDto {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  @ApiProperty({
    example: 'Frontend Developer',
    minLength: 2,
    maxLength: 100,
  })
  title: string;

  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  @ApiProperty({
    example: 'Armenian National Bank',
    minLength: 2,
    maxLength: 100,
  })
  companyName: string;

  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  @ApiProperty({
    example: 'Information Technologies',
    minLength: 2,
    maxLength: 100,
  })
  industry: string;

  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  @ApiProperty({
    example: 'Yerevan, Armenia',
    minLength: 2,
    maxLength: 100,
  })
  location: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: 'Date...' })
  startDate: Date;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: 'Date...' })
  endDate: Date;

  @IsOptional()
  @Length(0, 1000)
  @IsString()
  @ApiPropertyOptional({
    example: 'Any Description Here...',
    minLength: 0,
    maxLength: 1000,
  })
  description: string;
}
