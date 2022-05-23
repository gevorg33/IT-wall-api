import { ApiProperty } from '@nestjs/swagger';

export class SkillType {
  @ApiProperty({ example: 23 })
  id: number;

  @ApiProperty({ example: 'Node.js' })
  name: string;
}
