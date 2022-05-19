import { ApiProperty } from '@nestjs/swagger';

export class RoleType {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: 'IT Systems' })
  name: string;
}
