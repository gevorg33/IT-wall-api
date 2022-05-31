import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarEntity } from './avatar.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([AvatarEntity]), UploadModule],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
