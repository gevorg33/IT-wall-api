import { ApiProperty } from '@nestjs/swagger';

export class ProfLevelType {
  @ApiProperty({ example: 23 })
  id: number;

  @ApiProperty({ example: 'Elementary' })
  name: string;
}
