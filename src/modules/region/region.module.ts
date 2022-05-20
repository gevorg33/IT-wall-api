import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from '../language/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity])],
  controllers: [RegionController],
  providers: [RegionService],
  exports: [RegionService],
})
export class RegionModule {}
