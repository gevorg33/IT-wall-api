import { ApiProperty } from '@nestjs/swagger';
import { UserJobPermissions } from '../../../common/constants/user-job-permissions';

export class UserJobType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: 17 })
  jobId: number;

  @ApiProperty({
    enum: UserJobPermissions,
    example: UserJobPermissions.PUBLISHER,
  })
  permission: UserJobPermissions;
}

export class UserJobResponseType {
  @ApiProperty()
  userJob: UserJobType;
}

export class UserJobsResponseType {
  @ApiProperty({ type: UserJobType, isArray: true })
  userJobs: UserJobType[];
}
