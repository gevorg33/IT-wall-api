import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { AttachmentEntity } from '../attachment/attachment.entity';
import { AttachmentItemTypes } from '../../common/constants/attachment-item-types';

@Entity({ name: 'certifications' })
export class CertificationEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  userId: number;

  @Column({ length: 120 })
  @ApiProperty({ example: 'Node JS Course', nullable: true })
  title: string;

  @Column({ length: 120, nullable: true })
  @ApiProperty({ example: 'ATM Web Training Center' })
  companyName: string;

  @Column({ length: 60 })
  @ApiProperty({ example: 'Beginner' })
  level: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({ example: 'Date...' })
  issued: Date;

  ///////////////////////////////// Relations /////////////////////////////////

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.certifications)
  user: UserEntity;

  attachments?: AttachmentEntity[];

  ///////////////////////////////// Triggers /////////////////////////////////

  @AfterLoad()
  async includeAttachments() {
    this.attachments = await AttachmentEntity.find({
      where: { itemType: AttachmentItemTypes.CERTIFICATION, itemId: this.id },
    });
  }
}
