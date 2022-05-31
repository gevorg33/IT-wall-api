import { ApiProperty } from '@nestjs/swagger';

export class AvatarType {
  @ApiProperty({ example: 17 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: '-----' })
  key: string;

  @ApiProperty({ example: 'image url... (high quality)' })
  high: string;

  @ApiProperty({ example: 'image url... (normal quality)' })
  medium: string;

  @ApiProperty({ example: 'image url... (low quality)' })
  low: string;
}
