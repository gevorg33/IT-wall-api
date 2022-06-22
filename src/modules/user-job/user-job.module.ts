import { Module } from '@nestjs/common';
import { UserJobController } from './user-job.controller';
import { UserJobService } from './user-job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserJobEntity } from './user-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserJobEntity])],
  controllers: [UserJobController],
  providers: [UserJobService],
  exports: [UserJobService],
})
export class UserJobModule {}
