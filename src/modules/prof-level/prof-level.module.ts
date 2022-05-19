import { Module } from '@nestjs/common';
import { ProfLevelController } from './prof-level.controller';
import { ProfLevelService } from './prof-level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfLevelEntity } from './prof-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfLevelEntity])],
  controllers: [ProfLevelController],
  providers: [ProfLevelService],
  exports: [ProfLevelService],
})
export class ProfLevelModule {}
