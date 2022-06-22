import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { JobEntity } from '../job/job.entity';
import { UserJobPermissions } from '../../common/constants/user-job-permissions';

@Entity({ name: 'users_jobs' })
export class UserJobEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  userId: number;

  @Column()
  @ApiProperty({ example: 955 })
  jobId: number;

  @Column({
    type: 'enum',
    enum: UserJobPermissions,
    default: UserJobPermissions.USER,
  })
  @ApiProperty()
  permission: UserJobPermissions;

  ///////////////////////////////// Relations /////////////////////////////////

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.userJobs, { onDelete: 'CASCADE' })
  user: UserEntity;

  @JoinColumn({ name: 'jobId' })
  @ManyToOne(() => JobEntity, (job) => job.userJobs, { onDelete: 'CASCADE' })
  job: JobEntity;
}
