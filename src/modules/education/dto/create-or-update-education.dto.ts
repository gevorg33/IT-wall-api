import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrUpdateEducationDto {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  @ApiProperty({
    example: 'National University Of Armenia',
    minLength: 2,
    maxLength: 100,
  })
  institution: string;

  @IsNotEmpty()
  @Length(2, 60)
  @IsString()
  @ApiProperty({ example: `Bachelor's`, minLength: 2, maxLength: 60 })
  degree: string;

  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  @ApiProperty({
    example: 'Information Technologies',
    minLength: 2,
    maxLength: 100,
  })
  fieldOfStudy: string;

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
