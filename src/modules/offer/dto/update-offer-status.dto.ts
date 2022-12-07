import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OfferStatuses } from '../../../common/constants/offer-statuses';

export class UpdateOfferStatusDto {
  @IsNotEmpty()
  @IsEnum(OfferStatuses)
  @ApiProperty({
    enum: OfferStatuses,
    example: OfferStatuses.ACCEPT,
  })
  status: OfferStatuses;
}
