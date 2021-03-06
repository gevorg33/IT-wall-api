import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../../guards/auth.guard';
import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [CompanyService, AuthGuard],
  exports: [CompanyService],
})
export class CompanyModule {}
