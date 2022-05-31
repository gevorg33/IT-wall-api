import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLanguageResponseType } from './types/user-language.type';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { CreateUserLanguageDto } from './dto/create-user-language.dto';
import { UserLanguageService } from './user-language.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('user-languages')
@ApiTags('User Languages')
@UseGuards(JwtAuthGuard)
export class UserLanguageController {
  constructor(private readonly userLanguageService: UserLanguageService) {}

  @Post('/')
  @ApiOperation({ summary: 'Add User Language' })
  @ApiOkResponse({ type: UserLanguageResponseType })
  async addLanguage(
    @User() me: UserEntity,
    @Body() data: CreateUserLanguageDto,
  ): Promise<UserLanguageResponseType> {
    const userLanguage = await this.userLanguageService.addLanguage(me, data);
    return { userLanguage };
  }

  @Delete('/:languageId')
  @ApiOperation({ summary: 'Delete User Language' })
  @ApiOkResponse({ type: UserLanguageResponseType })
  async deleteLanguage(
    @User() me: UserEntity,
    @Param('languageId') languageId: number,
  ): Promise<UserLanguageResponseType> {
    const userLanguage = await this.userLanguageService.deleteLanguage(
      me,
      languageId,
    );
    return { userLanguage };
  }
}
