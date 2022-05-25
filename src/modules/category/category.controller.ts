import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoriesListType } from './types/categories-list.type';

@Controller('categories')
@ApiTags('Categories (Field Of Works)')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Categories List' })
  @ApiOkResponse({ type: CategoriesListType })
  async getCategoriesList(): Promise<CategoriesListType> {
    const categories = await this.categoryService.getCategoriesList();
    return { categories };
  }
}
