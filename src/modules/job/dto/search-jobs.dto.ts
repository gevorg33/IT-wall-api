import { IsEnum, IsOptional, IsString } from 'class-validator';
import { JobStatuses } from '../../../common/constants/job-statuses';

export class SearchJobsDto {
  @IsOptional()
  @IsEnum(JobStatuses)
  status: JobStatuses;

  @IsOptional()
  @IsString()
  q: string;
}
