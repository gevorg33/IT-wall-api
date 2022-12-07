import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OfferStatuses } from '../../../common/constants/offer-statuses';

export class GetOffersDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 100 })
  jobId: number;

  @IsOptional()
  @IsEnum(OfferStatuses)
  @ApiPropertyOptional({
    enum: OfferStatuses,
    example: OfferStatuses.ACCEPT,
  })
  status: OfferStatuses;
}
