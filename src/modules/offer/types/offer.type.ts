import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OfferType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiPropertyOptional({ example: 2 })
  parentId: number;

  @ApiProperty({ example: 'Coca Cola Support Website' })
  title: string;

  @ApiPropertyOptional({ example: 'Any Cover Letter...' })
  cover: string;

  @ApiProperty({ example: 100 })
  budgetPrice: number;

  @ApiProperty({ example: 50 })
  offerPrice: number;
}

export class OfferResponseType {
  @ApiProperty()
  offer: OfferType;
}

export class OffersResponseType {
  @ApiProperty({ type: OfferType, isArray: true })
  offers: OfferType[];
}
