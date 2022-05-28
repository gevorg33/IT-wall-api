import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'work-experience' })
export class WorkExperienceEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  userId: number;

  @Column({ length: 120 })
  @ApiProperty({ example: 'Armenian National Bank' })
  companyName: string;

  @Column({ length: 100 })
  @ApiProperty({ example: 'Information Technologies' })
  industry: string;

  @Column({ length: 100 })
  @ApiProperty({ example: 'Frontend Developer' })
  title: string;

  @Column({ length: 150 })
  @ApiProperty({ example: 'Yerevan, Armenia' })
  location: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({ example: 'Date...' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({ example: 'Date...' })
  endDate: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'Any Description Here...' })
  description: string;

  ///////////////////////////////// Relations /////////////////////////////////

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.workExperience)
  user: UserEntity;
}
