import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ProjectResponseType } from './types/project.type';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectSize } from '../../utils/file-validation';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoles } from '../../common/constants/user-roles';

@Controller('projects')
@ApiTags('Project')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/')
  @Roles(UserRoles.FREELANCER, UserRoles.COMPANY)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create Project' })
  @ApiOkResponse({ type: ProjectResponseType })
  @UseInterceptors(
    FilesInterceptor('files', 6, {
      limits: { fileSize: ProjectSize },
    }),
  )
  async create(
    @User() me: UserEntity,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: CreateProjectDto,
  ): Promise<ProjectResponseType> {
    const project = await this.projectService.create(me, data, files);
    return { project };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Project' })
  @ApiOkResponse({ type: ProjectResponseType })
  async getById(@Param('id') id: number): Promise<ProjectResponseType> {
    const project = await this.projectService.getById(id);
    return { project };
  }

  @Patch('/:id')
  @Roles(UserRoles.FREELANCER, UserRoles.COMPANY)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update Project' })
  @ApiOkResponse({ type: ProjectResponseType })
  @UseInterceptors(FilesInterceptor('files', 6))
  async update(
    @User() me: UserEntity,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: number,
    @Body() data: UpdateProjectDto,
  ): Promise<ProjectResponseType> {
    const project = await this.projectService.update(id, me, data, files);
    return { project };
  }

  @Delete('/:id')
  @Roles(UserRoles.FREELANCER, UserRoles.COMPANY)
  @ApiOperation({ summary: 'Delete Project' })
  @ApiOkResponse({ type: ProjectResponseType })
  async delete(
    @User() me: UserEntity,
    @Param('id') id: number,
  ): Promise<ProjectResponseType> {
    const project = await this.projectService.delete(id, me);
    return { project };
  }
}
