import { Module } from '@nestjs/common';
import { SpecificationController } from './specification.controller';
import { SpecificationService } from './specification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecificationEntity } from './specification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpecificationEntity])],
  controllers: [SpecificationController],
  providers: [SpecificationService],
  exports: [SpecificationService],
})
export class SpecificationModule {}
