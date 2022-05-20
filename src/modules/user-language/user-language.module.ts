import { Module } from '@nestjs/common';
import { UserLanguageController } from './user-language.controller';
import { UserLanguageService } from './user-language.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLanguageEntity } from './user-language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLanguageEntity])],
  controllers: [UserLanguageController],
  providers: [UserLanguageService],
  exports: [UserLanguageService],
})
export class UserLanguageModule {}
