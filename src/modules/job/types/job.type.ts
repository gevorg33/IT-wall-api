import { ApiProperty } from '@nestjs/swagger';
import { JobLevels } from '../../../common/constants/job-levels';
import { JobPaymentDetails } from '../../../common/constants/job-payment-details';

export class JobType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: 1 })
  categoryId: number;

  @ApiProperty({ example: 'Quick Graphic Design Work - Editing File' })
  title: string;

  @ApiProperty({ example: 'Any Description Here...' })
  description: string;

  @ApiProperty({ example: 100 })
  budgetPrice: number;

  @ApiProperty({ enum: JobLevels, example: JobLevels.MID_LEVEL })
  level: JobLevels;

  @ApiProperty({
    enum: JobPaymentDetails,
    example: JobPaymentDetails.FIXED_PRICE,
  })
  paymentDetails: JobPaymentDetails;
}

export class JobResponseType {
  @ApiProperty()
  job: JobType;
}
