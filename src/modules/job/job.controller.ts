import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { JobResponseType, JobsListResponseType } from './types/job.type';
import { CreateJobDto } from './dto/create-job.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JobSize } from '../../utils/file-validation';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { GetMyJobsDto } from './dto/get-jobs-filters.dto';
import { SearchJobsDto } from './dto/search-jobs.dto';

@Controller('jobs')
@ApiTags('Jobs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/')
  @Roles(UserRoles.CUSTOMER, UserRoles.COMPANY)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Publish Job' })
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

  @Get('/my')
  @ApiOperation({ summary: 'Get My Jobs' })
  @ApiOkResponse({ type: JobsListResponseType })
  async getMyJobs(
    @User() me: UserEntity,
    @Query() qData: GetMyJobsDto,
  ): Promise<JobsListResponseType> {
    const jobs = await this.jobService.getMyJobs(me, qData);
    return { jobs };
  }

  @Get('/')
  @ApiOperation({ summary: 'Search Jobs' })
  @ApiOkResponse({ type: JobsListResponseType })
  async search(
    @User() me: UserEntity,
    @Query() qData: SearchJobsDto,
  ): Promise<JobsListResponseType> {
    const jobs = await this.jobService.search(me, qData);
    return { jobs };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Existing Job' })
  @ApiOkResponse({ type: JobResponseType })
  async getById(@Param('id') id: number): Promise<JobResponseType> {
    const job = await this.jobService.getById(id);
    return { job };
  }

  @Patch('/:id')
  @Roles(UserRoles.CUSTOMER, UserRoles.COMPANY)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update Existing Job' })
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
  @ApiOperation({ summary: 'Delete Existing Job' })
  @ApiOkResponse({ type: JobResponseType })
  async delete(
    @User() me: UserEntity,
    @Param('id') id: number,
  ): Promise<JobResponseType> {
    const job = await this.jobService.delete(id, me);
    return { job };
  }
}
