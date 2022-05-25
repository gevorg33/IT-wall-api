import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecificationEntity } from './specification.entity';
import { SpecificationType } from './types/specification.type';

@Injectable()
export class SpecificationService {
  constructor(
    @InjectRepository(SpecificationEntity)
    private readonly specificationRepository: Repository<SpecificationEntity>,
  ) {}

  async getSpecificationsList(): Promise<SpecificationType[]> {
    return this.specificationRepository.find({
      order: { name: 'ASC' },
      select: ['id', 'name'],
    });
  }
}
