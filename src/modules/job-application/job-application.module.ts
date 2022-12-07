import { Module } from '@nestjs/common';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationEntity } from './job-application.entity';
import { AttachmentModule } from '../attachment/attachment.module';
import { UserJobModule } from '../user-job/user-job.module';
import { JobEntity } from '../job/job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobApplicationEntity, JobEntity]),
    AttachmentModule,
    UserJobModule,
  ],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
  exports: [JobApplicationService],
})
export class JobApplicationModule {}
