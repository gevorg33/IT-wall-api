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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ProjectResponseType } from './types/project.type';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
@ApiTags('Project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create Project' })
  @ApiOkResponse({ type: ProjectResponseType })
  @UseInterceptors(FilesInterceptor('files', 6))
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
  @ApiOperation({ summary: 'Delete Project' })
  @ApiOkResponse({ type: ProjectResponseType })
  @UseInterceptors(FilesInterceptor('files', 6))
  async delete(
    @User() me: UserEntity,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: number,
  ): Promise<ProjectResponseType> {
    const project = await this.projectService.delete(id, me);
    return { project };
  }
}
