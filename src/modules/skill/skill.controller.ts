import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { SkillResponseType } from './types/skill.type';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('skills')
@ApiTags('Skills')
@UseGuards(JwtAuthGuard)
export class SkillController {
  constructor(private readonly skillsService: SkillService) {}

  @Post('/')
  @ApiOperation({ summary: 'Add Skill' })
  @ApiOkResponse({ type: SkillResponseType })
  async create(
    @User() me: UserEntity,
    @Body() data: CreateSkillDto,
  ): Promise<SkillResponseType> {
    const skill = await this.skillsService.create(me, data);
    return { skill };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Add Skill' })
  @ApiOkResponse({ type: SkillResponseType })
  async delete(
    @User() me: UserEntity,
    @Param('id') id: number,
  ): Promise<SkillResponseType> {
    const skill = await this.skillsService.delete(me, id);
    return { skill };
  }
}
