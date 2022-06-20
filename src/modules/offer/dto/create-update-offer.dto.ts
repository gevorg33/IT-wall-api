import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUpdateOfferDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 558 })
  jobId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 100 })
  budgetPrice: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 50 })
  offerPrice: number;

  @IsNotEmpty()
  @Length(2, 120)
  @IsString()
  @ApiProperty({ example: 'Any Offer Title...', minLength: 2, maxLength: 120 })
  title: string;

  @IsOptional()
  @Length(0, 1000)
  @IsString()
  @ApiPropertyOptional({ example: 'Any Description Here...', maxLength: 1000 })
  description: string;
}
