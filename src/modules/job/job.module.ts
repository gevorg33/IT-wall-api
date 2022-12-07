import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from './job.entity';
import { AttachmentModule } from '../attachment/attachment.module';
import { UserJobModule } from '../user-job/user-job.module';
import { UserJobEntity } from '../user-job/user-job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobEntity, UserJobEntity]),
    AttachmentModule,
    UserJobModule,
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
