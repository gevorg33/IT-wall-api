import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { RolesEntity } from "../roles/roles.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService]
})
export class UserModule {

}