import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AttachmentItemTypes } from '../../../common/constants/attachment-item-types';

export class CreateAttachmentDto {
  @IsNotEmpty()
  @IsEnum(AttachmentItemTypes)
  @ApiProperty({
    enum: AttachmentItemTypes,
    example: AttachmentItemTypes.PROJECT,
  })
  itemType: AttachmentItemTypes;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 22 })
  itemId: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'projects' })
  folder: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '-----' })
  key: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '-----' })
  url: string;
}
