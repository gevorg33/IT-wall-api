import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JobAppStatuses } from '../../../common/constants/job-application-statuses';

export class UpdateJobAppStatusDto {
  @IsNotEmpty()
  @IsEnum(JobAppStatuses)
  @ApiProperty({
    enum: JobAppStatuses,
    example: JobAppStatuses.ACCEPT,
  })
  status: JobAppStatuses;
}
