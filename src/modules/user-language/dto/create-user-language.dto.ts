import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { LanguageLevels } from '../../../common/constants/language-levels';

export class CreateUserLanguageDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 48 })
  languageId: number;

  @IsOptional()
  @IsEnum(LanguageLevels)
  @ApiPropertyOptional({ example: LanguageLevels.LIMITED_WORKING_PROFICIENCY })
  level: LanguageLevels;
}
