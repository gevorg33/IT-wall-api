import { Controller, Get } from '@nestjs/common';
import { LanguageService } from './language.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LanguagesListType } from './types/languages-list.type';
import { LanguageLevelsListType } from '../user-language/types/language-levels-list.type';

@Controller('languages')
@ApiTags('Languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Languages List' })
  @ApiOkResponse({ type: LanguagesListType })
  async getLanguagesList(): Promise<LanguagesListType> {
    const languages = await this.languageService.getLanguagesList();
    return { languages };
  }

  @Get('/levels')
  @ApiOperation({ summary: 'Get Language Levels List' })
  @ApiOkResponse({ type: LanguageLevelsListType })
  async getLanguageLevelsList(): Promise<LanguageLevelsListType> {
    const levels = await this.languageService.getLanguageLevelsList();
    return { levels };
  }
}
