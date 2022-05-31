import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttachmentEntity } from '../../attachment/attachment.entity';

export class ProjectType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: 'Coca Cola Support Website' })
  title: string;

  @ApiProperty({ example: 'Any Description Here...' })
  description: string;

  @ApiPropertyOptional({ type: AttachmentEntity, isArray: true })
  attachments?: AttachmentEntity[];
}

export class ProjectResponseType {
  @ApiProperty()
  project: ProjectType;
}
