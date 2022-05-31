import {
  IsDateString,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCertificationDto {
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
  @ApiPropertyOptional({
    example: 'Beginner',
    minLength: 0,
    maxLength: 60,
  })
  level: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: 'Date...' })
  issued: Date;

  @IsOptional()
  @IsJSON()
  @ApiPropertyOptional({
    example: '[45, 47]',
    description: `Array of attachment id's (JSON format)`,
  })
  attachmentIdsForDelete: string;
}
