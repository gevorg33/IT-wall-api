import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsNotEmpty()
  @Length(2, 120)
  @IsString()
  @ApiProperty({
    example: 'Coca Cola Support Website',
    minLength: 2,
    maxLength: 120,
  })
  title: string;

  @IsOptional()
  @Length(0, 1000)
  @IsString()
  @ApiPropertyOptional({ example: 'Any Description Here...', maxLength: 1000 })
  description: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Array Of Files' })
  files: Array<Express.Multer.File>;
}
