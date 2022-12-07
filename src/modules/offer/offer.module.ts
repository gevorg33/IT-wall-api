import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferEntity } from './offer.entity';
import { JobModule } from '../job/job.module';
import { JobEntity } from '../job/job.entity';
import { UserJobModule } from '../user-job/user-job.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OfferEntity, JobEntity]),
    JobModule,
    UserJobModule,
  ],
  controllers: [OfferController],
  providers: [OfferService],
  exports: [OfferService],
})
export class OfferModule {}
