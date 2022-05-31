import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { AvatarEntity } from './avatar.entity';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(AvatarEntity)
    private readonly avatarRepository: Repository<AvatarEntity>,
    private readonly uploadService: UploadService,
  ) {}

  async addAvatar(
    userId: number,
    img: Express.Multer.File,
  ): Promise<AvatarEntity> {
    const upload: any = await this.uploadService.uploadAvatar(userId, img);

    let avatar = await this.avatarRepository.findOne({
      where: { userId },
    });

    if (!avatar) {
      avatar = new AvatarEntity();
      avatar.userId = userId;
    } else {
      await this.uploadService.deleteFile(avatar.key);
    }

    avatar.key = upload.public_id;
    avatar.high = upload.url;
    avatar.medium =
      upload.responsive_breakpoints[0].breakpoints[0]?.url || upload.url;
    avatar.low =
      upload.responsive_breakpoints[0].breakpoints[2]?.url ||
      upload.responsive_breakpoints[0].breakpoints[1]?.url ||
      upload.responsive_breakpoints[0].breakpoints[0]?.url ||
      upload.url;
    return this.avatarRepository.save(avatar);
  }

  async deleteAvatar(userId: number): Promise<AvatarEntity> {
    const avatar = await this.avatarRepository.findOne({
      where: {
        userId,
      },
    });
    if (!avatar) {
      return null;
    }
    const queryRunner = getConnection().createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await this.avatarRepository.delete(avatar.id);

      await this.uploadService.deleteFile(avatar.key);

      await queryRunner.commitTransaction();

      return avatar;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }
}
