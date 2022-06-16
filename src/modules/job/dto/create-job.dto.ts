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
  @ApiPropertyOptional({
    example: 'Any Description Here...',
    minLength: 0,
    maxLength: 120,
  })
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 3 })
  categoryId: number;

  @IsNotEmpty()
  @IsEnum(JobLevels)
  @ApiProperty({
    example: JobLevels.ENTRY_LEVEL,
    minLength: 2,
    maxLength: 120,
  })
  level: JobLevels;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 100 })
  budgetPrice: number;

  @IsNotEmpty()
  @IsEnum(JobPaymentDetails)
  @ApiProperty({
    example: JobPaymentDetails.HOURLY_PAYMENT,
    minLength: 2,
    maxLength: 120,
  })
  paymentDetails: JobPaymentDetails;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Array Of Files' })
  files: Array<Express.Multer.File>;
}
