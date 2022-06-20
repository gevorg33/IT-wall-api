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
import { JobService } from './job.service';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoles } from '../../common/constants/user-roles';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { JobResponseType } from './types/job.type';
import { CreateJobDto } from './dto/create-job.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JobSize } from '../../utils/file-validation';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('jobs')
@ApiTags('Jobs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/')
  @Roles(UserRoles.CUSTOMER, UserRoles.COMPANY)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Publish job' })
  @ApiOkResponse({ type: JobResponseType })
  @UseInterceptors(
    FilesInterceptor('files', 6, {
      limits: { fileSize: JobSize },
    }),
  )
  async create(
    @User() me: UserEntity,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: CreateJobDto,
  ): Promise<JobResponseType> {
    const job = await this.jobService.create(me, data, files);
    return { job };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get existing job' })
  @ApiOkResponse({ type: JobResponseType })
  async getById(@Param('id') id: number): Promise<JobResponseType> {
    const job = await this.jobService.getById(id);
    return { job };
  }

  @Patch('/:id')
  @Roles(UserRoles.CUSTOMER, UserRoles.COMPANY)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update existing job' })
  @ApiOkResponse({ type: JobResponseType })
  @UseInterceptors(FilesInterceptor('files', 6))
  async update(
    @User() me: UserEntity,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: UpdateJobDto,
    @Param('id') id: number,
  ): Promise<JobResponseType> {
    const job = await this.jobService.update(id, me, data, files);
    return { job };
  }

  @Delete('/:id')
  @Roles(UserRoles.CUSTOMER, UserRoles.COMPANY)
  @ApiOperation({ summary: 'Delete existing job' })
  @ApiOkResponse({ type: JobResponseType })
  async delete(
    @User() me: UserEntity,
    @Param('id') id: number,
  ): Promise<JobResponseType> {
    const job = await this.jobService.delete(id, me);
    return { job };
  }
}
