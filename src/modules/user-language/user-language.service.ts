import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLanguageEntity } from './user-language.entity';

@Injectable()
export class UserLanguageService {
  constructor(
    @InjectRepository(UserLanguageEntity)
    private readonly profLevelRepository: Repository<UserLanguageEntity>,
  ) {}
}
