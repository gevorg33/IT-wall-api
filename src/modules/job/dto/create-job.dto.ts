import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobLevels } from '../../../common/constants/job-levels';
import { Type } from 'class-transformer';
import { JobPaymentDetails } from '../../../common/constants/job-payment-details';

export class CreateJobDto {
  @IsNotEmpty()
  @Length(2, 120)
  @IsString()
  @ApiProperty({
    example: 'Coca Cola Support Website',
    minLength: 2,
    maxLength: 120,
  })
  title: string;

  @IsOptional()
  @Length(0, 1000)
  @IsString()
  @ApiPropertyOptional({ example: 'Any Description Here...', maxLength: 1000 })
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 3 })
  categoryId: number;

  @IsNotEmpty()
  @IsEnum(JobLevels)
  @ApiProperty({ enum: JobLevels, example: JobLevels.ENTRY_LEVEL })
  level: JobLevels;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 100 })
  budgetPrice: number;

  @IsNotEmpty()
  @IsEnum(JobPaymentDetails)
  @ApiProperty({
    enum: JobPaymentDetails,
    example: JobPaymentDetails.HOURLY_PAYMENT,
  })
  paymentDetails: JobPaymentDetails;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Array Of Files' })
  files: Array<Express.Multer.File>;
}
