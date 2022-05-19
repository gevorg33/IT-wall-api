import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfLevelEntity } from './prof-level.entity';

@Injectable()
export class ProfLevelService {
  constructor(
    @InjectRepository(ProfLevelEntity)
    private readonly profLevelRepository: Repository<ProfLevelEntity>,
  ) {}

  async getProfLevelsList() {
    return this.profLevelRepository.find({
      order: { name: 'ASC' },
      select: ['id', 'name'],
    });
  }
}
