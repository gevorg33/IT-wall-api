import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLanguageEntity } from './user-language.entity';
import { UserEntity } from '../user/user.entity';
import { CreateUserLanguageDto } from './dto/create-user-language.dto';

@Injectable()
export class UserLanguageService {
  constructor(
    @InjectRepository(UserLanguageEntity)
    private readonly userLanguageRepository: Repository<UserLanguageEntity>,
  ) {}

  async addLanguage(
    user: UserEntity,
    { languageId, level }: CreateUserLanguageDto,
  ): Promise<UserLanguageEntity> {
    try {
      let userLanguage = await this.userLanguageRepository.findOne({
        where: { userId: user.id, languageId },
      });
      if (!userLanguage) {
        userLanguage = new UserLanguageEntity();
        userLanguage.userId = user.id;
        userLanguage.languageId = languageId;
      }
      userLanguage.level = level;

      return this.userLanguageRepository.save(userLanguage);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteLanguage(
    user: UserEntity,
    languageId: number,
  ): Promise<UserLanguageEntity> {
    const userLanguage = await this.userLanguageRepository.findOne({
      where: { userId: user.id, languageId },
    });
    if (!userLanguage) {
      throw new NotFoundException('UserLanguage not found');
    }
    await this.userLanguageRepository.delete({
      userId: user.id,
      languageId,
    });
    return userLanguage;
  }
}
