import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OfferStatuses } from '../../../common/constants/offer-statuses';
import { UserEntity } from '../../user/user.entity';

export class OfferType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: 24 })
  toUserId: number;

  @ApiProperty({ example: 'Coca Cola Support Website' })
  title: string;

  @ApiPropertyOptional({ example: 'Any Cover Letter...' })
  cover: string;

  @ApiProperty({ example: 100 })
  budgetPrice: number;

  @ApiProperty({ example: 50 })
  offerPrice: number;

  @ApiProperty({ example: OfferStatuses.PENDING })
  status: OfferStatuses;

  @ApiPropertyOptional()
  user?: UserEntity;

  @ApiPropertyOptional()
  toUser?: UserEntity;
}

export class OfferResponseType {
  @ApiProperty()
  offer: OfferType;
}

export class OffersResponseType {
  @ApiProperty({ type: OfferType, isArray: true })
  offers: OfferType[];
}
