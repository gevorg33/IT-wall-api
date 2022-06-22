import { IsEnum, IsOptional } from 'class-validator';
import { JobStatuses } from '../../../common/constants/job-statuses';

export class GetJobsFiltersDto {
  @IsOptional()
  @IsEnum(JobStatuses)
  status: JobStatuses;
}
