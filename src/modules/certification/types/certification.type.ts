import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttachmentEntity } from '../../attachment/attachment.entity';

export class CertificationType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: 'Node JS Course' })
  title: string;

  @ApiProperty({ example: 'ATM Web Training Center' })
  companyName: string;

  @ApiProperty({ example: 'Beginner' })
  level: string;

  @ApiProperty({ example: 'Date...' })
  issued: Date;

  @ApiPropertyOptional({ type: AttachmentEntity, isArray: true })
  attachments?: AttachmentEntity[];
}

export class CertificationResponseType {
  @ApiProperty()
  certification: CertificationType;
}
