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
import { JobApplicationService } from './job-application.service';
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
import {
  JobAppResponseType,
  JobAppsResponseType,
} from './types/job-application.type';
import { CreateJobAppDto } from './dto/create-job-application.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JobAppSize } from '../../utils/file-validation';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { GetJobApplicationListDto } from './dto/get-job-application-list.dto';
import { UpdateJobAppStatusDto } from './dto/update-job-application-status.dto';

@Controller('job-applications')
@ApiTags('Job Application')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JobApplicationController {
  constructor(private readonly jobAppService: JobApplicationService) {}

  @Post('/')
  @Roles(UserRoles.FREELANCER, UserRoles.COMPANY)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Apply To Job' })
  @ApiOkResponse({ type: JobAppResponseType })
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      limits: { fileSize: JobAppSize },
    }),
  )
  async create(
    @User() me: UserEntity,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: CreateJobAppDto,
  ): Promise<JobAppResponseType> {
    const jobApp = await this.jobAppService.create(me, data, files);
    return { jobApp };
  }

  @Patch('/:id')
  @Roles(UserRoles.FREELANCER, UserRoles.COMPANY)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update Job Application' })
  @ApiOkResponse({ type: JobAppResponseType })
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      limits: { fileSize: JobAppSize },
    }),
  )
  async update(
    @User() me: UserEntity,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: number,
    @Body() data,
  ): Promise<JobAppResponseType> {
    const jobApp = await this.jobAppService.update(me, id, data, files);
    return { jobApp };
  }

  @Get('/')
  @ApiOperation({ summary: 'Get Applied Jobs List' })
  @ApiOkResponse({ type: JobAppsResponseType })
  async getList(
    @User() me: UserEntity,
    @Query() qData: GetJobApplicationListDto,
  ): Promise<JobAppsResponseType> {
    const jobApps = await this.jobAppService.getList(me, qData);
    return { jobApps };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Applied Jobs List' })
  @ApiOkResponse({ type: JobAppResponseType })
  async getJobAppData(
    @User() me: UserEntity,
    @Param('id') id: number,
  ): Promise<JobAppResponseType> {
    const jobApp = await this.jobAppService.getJobAppData(me, id);
    return { jobApp };
  }

  @Delete('/:id')
  @Roles(UserRoles.FREELANCER, UserRoles.COMPANY)
  @ApiOperation({ summary: 'Cancel Application (delete JobApp)' })
  @ApiOkResponse({ type: JobAppResponseType })
  async delete(
    @User() me: UserEntity,
    @Param('id') id: number,
  ): Promise<JobAppResponseType> {
    const jobApp = await this.jobAppService.delete(me, id);
    return { jobApp };
  }

  @Patch('/:id/status')
  @Roles(UserRoles.CUSTOMER)
  @ApiOperation({ summary: 'Accept or decline jobApp status' })
  @ApiOkResponse({ type: JobAppResponseType })
  async updateStatus(
    @User() me: UserEntity,
    @Param('id') id: number,
    @Body() data: UpdateJobAppStatusDto,
  ): Promise<JobAppResponseType> {
    const jobApp = await this.jobAppService.updateStatus(me, id, data);
    return { jobApp };
  }
}
