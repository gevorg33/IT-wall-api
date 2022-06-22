import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { AttachmentEntity } from '../attachment/attachment.entity';
import { JobLevels } from '../../common/constants/job-levels';
import { JobPaymentDetails } from '../../common/constants/job-payment-details';
import { CategoryEntity } from '../category/category.entity';
import { CountryEntity } from '../country/country.entity';
import { OfferEntity } from '../offer/offer.entity';
import { AttachmentItemTypes } from '../../common/constants/attachment-item-types';
import { UserJobStatuses } from '../../common/constants/user-job-statuses';
import { UserJobEntity } from '../user-job/user-job.entity';

@Entity({ name: 'jobs' })
export class JobEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  publisherId: number;

  @Column()
  @ApiProperty({ example: 2, nullable: true })
  categoryId: number;

  @Column({ length: 150 })
  @ApiProperty({ example: 'Quick Graphic Design Work - Editing File' })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'Any Description Here...' })
  description: string;

  @Column({ type: 'enum', enum: JobLevels, default: JobLevels.ENTRY_LEVEL })
  @ApiProperty({ example: JobLevels.ENTRY_LEVEL })
  level: JobLevels;

  @Column()
  @ApiProperty({ example: 100 })
  budgetPrice: number;

  @Column({
    type: 'enum',
    enum: JobPaymentDetails,
    default: JobPaymentDetails.FIXED_PRICE,
  })
  @ApiProperty({ example: JobPaymentDetails.FIXED_PRICE })
  paymentDetails: JobPaymentDetails;

  @Column({ nullable: true })
  @ApiProperty({ example: 13 })
  countryId: number;

  @Column({
    type: 'enum',
    enum: UserJobStatuses,
    default: UserJobStatuses.NO_STATUS,
  })
  @ApiProperty()
  status: UserJobStatuses;

  ///////////////////////////////// Relations /////////////////////////////////

  @JoinColumn({ name: 'publisherId' })
  @ManyToOne(() => UserEntity, (user) => user.publishedJobs, {
    onDelete: 'CASCADE',
  })
  publisher: UserEntity;

  @ManyToOne(() => CountryEntity, (country) => country.jobs)
  @JoinColumn({ name: 'countryId' })
  country: CountryEntity;

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(() => CategoryEntity, (ctg) => ctg.jobs, { onDelete: 'SET NULL' })
  category: CategoryEntity;

  @OneToMany(() => OfferEntity, (offer) => offer.user)
  offers: OfferEntity[];

  @OneToMany(() => UserJobEntity, (userJob) => userJob.job)
  userJobs: UserJobEntity[];

  attachments?: AttachmentEntity[];

  ///////////////////////////////// Triggers /////////////////////////////////

  @AfterLoad()
  async includeAttachments() {
    this.attachments = await AttachmentEntity.find({
      where: { itemType: AttachmentItemTypes.JOB, itemId: this.id },
    });
  }
}
