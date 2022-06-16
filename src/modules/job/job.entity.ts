import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { AttachmentEntity } from '../attachment/attachment.entity';
import { JobLevels } from '../../common/constants/job-levels';
import { JobPaymentDetails } from '../../common/constants/job-payment-details';
import { CategoryEntity } from '../category/category.entity';
import { CountryEntity } from '../country/country.entity';
import { OfferEntity } from '../offer/offer.entity';

@Entity({ name: 'jobs' })
export class JobEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  userId: number;

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

  ///////////////////////////////// Relations /////////////////////////////////

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.projects, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => CountryEntity, (country) => country.jobs)
  @JoinColumn({ name: 'countryId' })
  country: CountryEntity;

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(() => CategoryEntity, (ctg) => ctg.jobs, { onDelete: 'SET NULL' })
  category: CategoryEntity;

  @OneToMany(() => OfferEntity, (offer) => offer.user)
  offers: OfferEntity[];

  attachments?: AttachmentEntity[];
}
