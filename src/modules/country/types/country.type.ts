import { ApiProperty } from '@nestjs/swagger';

export class CountryType {
  @ApiProperty({ example: 23 })
  id: number;

  @ApiProperty({ example: 'Armenia' })
  name: string;

  @ApiProperty({ example: 'AM' })
  code: string;
}
