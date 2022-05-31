import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AvatarDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'file (only image)' })
  avatar: Express.Multer.File;
}
