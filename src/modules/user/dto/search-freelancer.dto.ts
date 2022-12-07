import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationFiltersDto } from '../../../common/dto/pagination-filters.dto';
import { Type } from 'class-transformer';
import { JobLevels } from '../../../common/constants/job-levels';

export class SearchFreelancerDto extends PaginationFiltersDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({ example: 3 })
  categoryId: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({ example: 97 })
  countryId: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({ example: 48 })
  languageId: number;

  @IsOptional()
  @IsEnum(JobLevels)
  @ApiPropertyOptional({ enum: JobLevels, example: JobLevels.ENTRY_LEVEL })
  level: JobLevels;
}
