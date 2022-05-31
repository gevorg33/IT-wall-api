import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { WorkExperienceService } from './work-experience.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { WorkExperienceResponseType } from './types/work-experience.type';
import { CreateOrUpdateWorkExperienceDto } from './dto/create-or-update-work-experience.dto';

@Controller('work-experience')
@ApiTags('Work Experience')
@UseGuards(JwtAuthGuard)
export class WorkExperienceController {
  constructor(private readonly workExpService: WorkExperienceService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create Work Experience' })
  @ApiOkResponse({ type: WorkExperienceResponseType })
  async create(
    @User() me: UserEntity,
    @Body() data: CreateOrUpdateWorkExperienceDto,
  ): Promise<WorkExperienceResponseType> {
    const workExperience = await this.workExpService.create(me, data);
    return { workExperience };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Create Work Experience' })
  @ApiOkResponse({ type: WorkExperienceResponseType })
  async getById(@Param('id') id: number): Promise<WorkExperienceResponseType> {
    const workExperience = await this.workExpService.getById(id);
    return { workExperience };
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Work Experience' })
  @ApiOkResponse({ type: WorkExperienceResponseType })
  async update(
    @User() me: UserEntity,
    @Body() data: CreateOrUpdateWorkExperienceDto,
    @Param('id') id: number,
  ): Promise<WorkExperienceResponseType> {
    const workExperience = await this.workExpService.update(id, me, data);
    return { workExperience };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Work Experience' })
  @ApiOkResponse({ type: WorkExperienceResponseType })
  async delete(
    @User() me: UserEntity,
    @Param('id') id: number,
  ): Promise<WorkExperienceResponseType> {
    const workExperience = await this.workExpService.delete(id, me);
    return { workExperience };
  }
}
