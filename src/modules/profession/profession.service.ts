import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfessionType } from './types/profession.type';
import { ProfessionEntity } from './profession.entity';

@Injectable()
export class ProfessionService {
  constructor(
    @InjectRepository(ProfessionEntity)
    private readonly professionsRepository: Repository<ProfessionEntity>,
  ) {}

  async getProfessionsList(): Promise<ProfessionType[]> {
    return this.professionsRepository.find({
      order: { name: 'ASC' },
      select: ['id', 'name'],
    });
  }
}
