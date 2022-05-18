import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: 'IT Systems' })
  name: string;
}
