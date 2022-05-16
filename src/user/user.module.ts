import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { RolesEntity } from '../roles/roles.entity';
import { CompanyEntity } from '../company/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity, CompanyEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
