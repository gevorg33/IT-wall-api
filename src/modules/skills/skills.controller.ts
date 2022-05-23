import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { SkillsListType } from './types/skills-list.type';

@Controller('skills')
@ApiTags('Skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Skills List' })
  @ApiOkResponse({ type: SkillsListType })
  async getSkillsList(): Promise<SkillsListType> {
    const skills = await this.skillsService.getSkillsList();
    return { skills };
  }
}
