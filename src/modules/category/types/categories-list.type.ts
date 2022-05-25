import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from './category.type';

export class CategoriesListType {
  @ApiProperty({ type: CategoryType, isArray: true })
  categories: CategoryType[];
}
