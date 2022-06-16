import { IsJSON, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends CreateJobDto {
  @IsOptional()
  @IsJSON()
  @ApiPropertyOptional({
    example: '[45, 47]',
    description: `Array of attachment id's (JSON format)`,
  })
  attachmentIdsForDelete: string;
}
