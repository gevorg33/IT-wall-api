import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillsEntity } from './skills.entity';
import { Repository } from 'typeorm';
import { SkillType } from './types/skill.type';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillsEntity)
    private readonly skillsRepository: Repository<SkillsEntity>,
  ) {}

  async getSkillsList(): Promise<SkillType[]> {
    return this.skillsRepository.find({
      order: { name: 'ASC' },
      select: ['id', 'name'],
    });
  }
}
