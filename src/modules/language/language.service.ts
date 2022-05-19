import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageEntity } from './language.entity';

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
}
