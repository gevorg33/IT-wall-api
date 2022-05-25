import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from './skill.entity';
import { Repository } from 'typeorm';
import { SkillType } from './types/skill.type';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillsRepository: Repository<SkillEntity>,
  ) {}

  async getSkillsList(): Promise<SkillType[]> {
    return this.skillsRepository.find({
      order: { name: 'ASC' },
      select: ['id', 'name'],
    });
  }
}
