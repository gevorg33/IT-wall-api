import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'educations' })
export class EducationEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  userId: number;

  @Column({ length: 150 })
  @ApiProperty({ example: 'National University Of Armenia' })
  institution: string;

  @Column({ length: 60 })
  @ApiProperty({ example: `Bachelor's` })
  degree: string;

  @Column({ length: 100 })
  @ApiProperty({ example: 'Information Technologies' })
  fieldOfStudy: string;

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
  @ManyToOne(() => UserEntity, (user) => user.educations)
  user: UserEntity;
}
