import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
  @IsNotEmpty()
  @Length(2, 120)
  @IsString()
  @ApiProperty({
    example: 'Coca Cola Support Website',
    minLength: 2,
    maxLength: 120,
  })
  title: string;

  @IsOptional()
  @Length(0, 1000)
  @IsString()
  @ApiPropertyOptional({
    example: 'Any Description Here...',
    minLength: 2,
    maxLength: 120,
  })
  description: string;

  @IsOptional()
  @IsJSON()
  @ApiPropertyOptional({
    example: '[45, 47]',
    description: `Array of attachment id's (JSON format)`,
  })
  attachmentIdsForDelete: string;
}
