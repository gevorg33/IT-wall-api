import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  @ApiProperty({ example: 'Nest JS', minLength: 2, maxLength: 60 })
  name: string;
}
