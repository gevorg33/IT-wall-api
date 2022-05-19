import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfLevelService } from './prof-level.service';
import { ProfLevelListType } from '../language/types/prof-level-list.type';

@Controller('prof-levels')
@ApiTags('Proficiency Levels')
export class ProfLevelController {
  constructor(private readonly levelService: ProfLevelService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Proficiency Levels List' })
  @ApiOkResponse({ type: ProfLevelListType })
  async getProfLevelsList(): Promise<ProfLevelListType> {
    const levels = await this.levelService.getProfLevelsList();
    return { levels };
  }
}
