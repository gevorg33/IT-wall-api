import { IsEnum, IsOptional } from 'class-validator';
import { JobStatuses } from '../../../common/constants/job-statuses';
import { UserJobPermissions } from '../../../common/constants/user-job-permissions';

export class GetMyJobsDto {
  @IsOptional()
  @IsEnum(JobStatuses)
  status: JobStatuses;

  @IsOptional()
  @IsEnum(UserJobPermissions)
  permission: UserJobPermissions;
}
