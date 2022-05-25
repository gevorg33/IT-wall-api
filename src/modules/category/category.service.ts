import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryType } from './types/category.type';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly professionsRepository: Repository<CategoryEntity>,
  ) {}

  async getCategoriesList(): Promise<CategoryType[]> {
    return this.professionsRepository.find({
      order: { name: 'ASC' },
      select: ['id', 'name'],
    });
  }
}
