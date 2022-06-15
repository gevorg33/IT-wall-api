import { ApiProperty } from '@nestjs/swagger';

export class OfferType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: 'Coca Cola Support Website' })
  title: string;

  @ApiProperty({ example: 'Any Description Here...' })
  description: string;

  @ApiProperty({ example: 100 })
  budgetPrice: number;

  @ApiProperty({ example: 50 })
  offerPrice: number;
}

export class OfferResponseType {
  @ApiProperty()
  offer: OfferType;
}
