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
import { EducationService } from './education.service';
import { EducationResponseType } from './types/education.type';
import { CreateOrUpdateEducationDto } from './dto/create-or-update-education.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoles } from '../../common/constants/user-roles';

@Controller('educations')
@ApiTags('Education')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post('/')
  @Roles(UserRoles.FREELANCER)
  @ApiOperation({ summary: 'Create Work Experience' })
  @ApiOkResponse({ type: EducationResponseType })
  async create(
    @User() me: UserEntity,
    @Body() data: CreateOrUpdateEducationDto,
  ): Promise<EducationResponseType> {
    const education = await this.educationService.create(me, data);
    return { education };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Create Work Experience' })
  @ApiOkResponse({ type: EducationResponseType })
  async getById(@Param('id') id: number): Promise<EducationResponseType> {
    const education = await this.educationService.getById(id);
    return { education };
  }

  @Patch('/:id')
  @Roles(UserRoles.FREELANCER)
  @ApiOperation({ summary: 'Update Work Experience' })
  @ApiOkResponse({ type: EducationResponseType })
  async update(
    @User() me: UserEntity,
    @Body() data: CreateOrUpdateEducationDto,
    @Param('id') id: number,
  ): Promise<EducationResponseType> {
    const education = await this.educationService.update(id, me, data);
    return { education };
  }

  @Delete('/:id')
  @Roles(UserRoles.FREELANCER)
  @ApiOperation({ summary: 'Delete Work Experience' })
  @ApiOkResponse({ type: EducationResponseType })
  async delete(
    @User() me: UserEntity,
    @Param('id') id: number,
  ): Promise<EducationResponseType> {
    const education = await this.educationService.delete(id, me);
    return { education };
  }
}
