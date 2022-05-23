import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionEntity } from './profession.entity';
import { ProfessionController } from './profession.controller';
import { ProfessionService } from './profession.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessionEntity])],
  controllers: [ProfessionController],
  providers: [ProfessionService],
  exports: [ProfessionService],
})
export class ProfessionModule {}
