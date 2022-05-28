import { Module } from '@nestjs/common';
import { WorkExperienceController } from './work-experience.controller';
import { WorkExperienceService } from './work-experience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkExperienceEntity } from './work-experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperienceEntity])],
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService],
  exports: [WorkExperienceService],
})
export class WorkExperienceModule {}
