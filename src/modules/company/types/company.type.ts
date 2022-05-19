import { ApiProperty } from '@nestjs/swagger';

export class CompanyType {
  @ApiProperty({ example: 23 })
  id: number;

  @ApiProperty({ example: 'IT Systems' })
  name: string;

  @ApiProperty({ example: 20 })
  taxNumber: number;
}
