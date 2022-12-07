import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { AttachmentEntity } from '../attachment/attachment.entity';
import { JobPaymentDetails } from '../../common/constants/job-payment-details';
import { AttachmentItemTypes } from '../../common/constants/attachment-item-types';
import { JobEntity } from '../job/job.entity';
import { JobAppStatuses } from '../../common/constants/job-application-statuses';

@Entity({ name: 'job_applications' })
export class JobApplicationEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  userId: number;

  @Column()
  @ApiProperty({ example: 955 })
  jobId: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'Any cover letter...' })
  cover: string;

  @Column()
  @ApiProperty({ example: 100 })
  expectedPrice: number;

  @Column({
    type: 'enum',
    enum: JobAppStatuses,
    default: JobAppStatuses.PENDING,
  })
  @ApiProperty()
  status: JobAppStatuses;

  @Column({
    type: 'enum',
    enum: JobPaymentDetails,
    default: JobPaymentDetails.FIXED_PRICE,
  })
  @ApiProperty({ example: JobPaymentDetails.FIXED_PRICE })
  paymentDetails: JobPaymentDetails;

  ///////////////////////////////// Relations /////////////////////////////////

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.jobApplications, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @JoinColumn({ name: 'jobId' })
  @ManyToOne(() => JobEntity, (job) => job.jobApplications, {
    onDelete: 'CASCADE',
  })
  job: JobEntity;

  attachments?: AttachmentEntity[];

  ///////////////////////////////// Triggers /////////////////////////////////

  @AfterLoad()
  async includeAttachments() {
    this.attachments = await AttachmentEntity.find({
      where: {
        itemType: AttachmentItemTypes.JOB_APPLICATION,
        itemId: this.id,
      },
    });
  }
}
