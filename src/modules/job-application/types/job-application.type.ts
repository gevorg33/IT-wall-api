import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobPaymentDetails } from '../../../common/constants/job-payment-details';
import { AttachmentEntity } from '../../attachment/attachment.entity';
import { UserType } from '../../user/types/user.type';
import { JobType } from '../../job/types/job.type';

export class JobAppType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: 955 })
  jobId: number;

  @ApiProperty({ example: 'Any cover letter...' })
  cover: string;

  @ApiProperty({ example: 100 })
  expectedPrice: number;

  @ApiProperty({ example: true })
  confirm: boolean;

  @ApiProperty({
    enum: JobPaymentDetails,
    example: JobPaymentDetails.FIXED_PRICE,
  })
  paymentDetails: JobPaymentDetails;

  @ApiPropertyOptional()
  user?: UserType;

  @ApiPropertyOptional()
  job?: JobType;

  @ApiPropertyOptional({ type: AttachmentEntity, isArray: true })
  attachments?: AttachmentEntity[];
}

export class JobAppResponseType {
  @ApiProperty()
  jobApp: JobAppType;
}

export class JobAppsResponseType {
  @ApiProperty({ type: JobAppType, isArray: true })
  jobApps: JobAppType[];
}
