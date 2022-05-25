import { ApiProperty } from '@nestjs/swagger';

export class CategoryType {
  @ApiProperty({ example: 23 })
  id: number;

  @ApiProperty({ example: 'Graphic design' })
  name: string;
}
