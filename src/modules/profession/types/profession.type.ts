import { ApiProperty } from '@nestjs/swagger';

export class ProfessionType {
  @ApiProperty({ example: 23 })
  id: number;

  @ApiProperty({ example: 'Graphic designer' })
  name: string;
}
