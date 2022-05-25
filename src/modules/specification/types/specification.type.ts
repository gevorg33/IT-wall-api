import { ApiProperty } from '@nestjs/swagger';

export class SpecificationType {
  @ApiProperty({ example: 23 })
  id: number;

  @ApiProperty({ example: 'Graphic designer' })
  name: string;
}
