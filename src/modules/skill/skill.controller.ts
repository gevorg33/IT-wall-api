import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { SkillsListType } from './types/skills-list.type';

@Controller('skills')
@ApiTags('Skills')
export class SkillController {
  constructor(private readonly skillsService: SkillService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Skills List' })
  @ApiOkResponse({ type: SkillsListType })
  async getSkillsList(): Promise<SkillsListType> {
    const skills = await this.skillsService.getSkillsList();
    return { skills };
  }
}
