import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { JobEntity } from '../job/job.entity';
import { OfferStatuses } from '../../common/constants/offer-statuses';

@Entity({ name: 'offers' })
export class OfferEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  userId: number;

  @Column()
  @ApiProperty({ example: 5, nullable: true })
  parentId: number;

  @Column()
  @ApiProperty({ example: 955 })
  jobId: number;

  @Column({ length: 120 })
  @ApiProperty({ example: 'Graphic Designer - Job Title' })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'Any cover letter...' })
  cover: string;

  @Column()
  @ApiProperty({ example: 100 })
  budgetPrice: number;

  @Column()
  @ApiProperty({ example: 50 })
  offerPrice: number;

  @Column({
    type: 'enum',
    enum: OfferStatuses,
    default: OfferStatuses.PENDING,
  })
  @ApiProperty()
  status: OfferStatuses;

  ///////////////////////////////// Relations /////////////////////////////////

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.offers, { onDelete: 'CASCADE' })
  user: UserEntity;

  @JoinColumn({ name: 'parentId' })
  @ManyToOne(() => OfferEntity, (offer) => offer.children, {
    onDelete: 'SET NULL',
  })
  parent: OfferEntity;

  @JoinColumn({ name: 'jobId' })
  @ManyToOne(() => JobEntity, (job) => job.offers)
  job: JobEntity;

  @OneToMany(() => OfferEntity, (offer) => offer.parent)
  children: OfferEntity[];
}
