import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfessionService } from './profession.service';
import { ProfessionsListType } from './types/professions-list.type';

@Controller('profession')
@ApiTags('Profession')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Professions List' })
  @ApiOkResponse({ type: ProfessionsListType })
  async getProfessionsList(): Promise<ProfessionsListType> {
    const professions = await this.professionService.getProfessionsList();
    return { professions };
  }
}
