import { ApiProperty } from '@nestjs/swagger';

export class LanguageType {
  @ApiProperty({ example: 23 })
  id: number;

  @ApiProperty({ example: 'Armenian' })
  name: string;

  @ApiProperty({ example: 'hy' })
  code: string;
}
