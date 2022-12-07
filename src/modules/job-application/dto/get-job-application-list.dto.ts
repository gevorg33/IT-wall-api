import { IsBooleanString, IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetJobApplicationListDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({ example: 100 })
  jobId: number;

  @IsOptional()
  @IsBooleanString()
  confirm: 'true' | 'false';
}
