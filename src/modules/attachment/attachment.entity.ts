import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AttachmentItemTypes } from '../../common/constants/attachment-item-types';

@Entity({ name: 'attachments' })
export class AttachmentEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 8 })
  itemId: number;

  @Column()
  @ApiProperty({ example: 'Project' })
  itemType: AttachmentItemTypes;

  @Column({ nullable: true })
  @ApiProperty({ example: 'projects' })
  folder: string;

  @Column()
  @ApiProperty({ example: '-----' })
  key: string;

  @Column()
  @ApiProperty({ example: '-----' })
  url: string;
}
