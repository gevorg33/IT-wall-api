import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferEntity } from './offer.entity';
import { JobService } from '../job/job.service';

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity]), JobService],
  controllers: [OfferController],
  providers: [OfferService],
  exports: [OfferService],
})
export class OfferModule {}
