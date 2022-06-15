import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'offers' })
export class OfferEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  userId: number;

  @Column()
  @ApiProperty({ example: 955 })
  jobId: number;

  @Column({ length: 120 })
  @ApiProperty({ example: 'Graphic Designer - Jog Title' })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'Any Description Here...' })
  description: string;

  @Column()
  @ApiProperty({ example: 100 })
  budgetPrice: number;

  @Column()
  @ApiProperty({ example: 50 })
  offerPrice: number;

  ///////////////////////////////// Relations /////////////////////////////////
  // @JoinColumn({ name: 'userId' })
  // @ManyToOne(() => UserEntity, (user) => user.projects)
  // user: UserEntity;
}
