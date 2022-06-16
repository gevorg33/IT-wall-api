import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageEntity } from './language.entity';
import { LanguageLevels } from '../../common/constants/language-levels';
import { LanguageLevelType } from '../user-language/types/language-levels-list.type';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageRepository: Repository<LanguageEntity>,
  ) {}

  async getLanguagesList() {
    return this.languageRepository.find({
      order: { name: 'ASC' },
      select: ['id', 'name', 'code'],
    });
  }

  async getLanguageLevelsList(): Promise<LanguageLevelType[]> {
    return Object.values(LanguageLevels).map((level) => {
      return { level };
    });
  }
}
