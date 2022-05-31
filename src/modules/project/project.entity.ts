import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { AttachmentEntity } from '../attachment/attachment.entity';
import { AttachmentItemTypes } from '../../common/constants/attachment-item-types';

@Entity({ name: 'projects' })
export class ProjectEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  userId: number;

  @Column({ length: 120 })
  @ApiProperty({ example: 'Coca Cola Support Website' })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'Any Description Here...' })
  description: string;

  ///////////////////////////////// Relations /////////////////////////////////

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.projects)
  user: UserEntity;

  attachments?: AttachmentEntity[];

  ///////////////////////////////// Triggers /////////////////////////////////

  @AfterLoad()
  async includeAttachments() {
    this.attachments = await AttachmentEntity.find({
      where: { itemType: AttachmentItemTypes.PROJECT, itemId: this.id },
    });
  }
}
