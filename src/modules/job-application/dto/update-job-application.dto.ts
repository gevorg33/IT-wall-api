import {
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { JobPaymentDetails } from '../../../common/constants/job-payment-details';

export class UpdateJobAppDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 100 })
  expectedPrice: number;

  @IsNotEmpty()
  @IsEnum(JobPaymentDetails)
  @ApiProperty({
    enum: JobPaymentDetails,
    example: JobPaymentDetails.FIXED_PRICE,
  })
  paymentDetails: JobPaymentDetails;

  @IsOptional()
  @Length(0, 1000)
  @IsString()
  @ApiPropertyOptional({ example: 'Any Description Here...', maxLength: 1000 })
  cover: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Array Of Files' })
  files: Array<Express.Multer.File>;

  @IsOptional()
  @IsJSON()
  @ApiPropertyOptional({
    example: '[45, 47]',
    description: `Array of attachment id's (JSON format)`,
  })
  attachmentIdsForDelete: string;
}
