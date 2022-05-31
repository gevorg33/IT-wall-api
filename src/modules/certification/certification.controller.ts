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
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { CertificationService } from './certification.service';
import { CertificationResponseType } from './types/certification.type';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('certifications')
@ApiTags('Certification')
@UseGuards(JwtAuthGuard)
export class CertificationController {
  constructor(private readonly certService: CertificationService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create Certification' })
  @ApiOkResponse({ type: CertificationResponseType })
  @UseInterceptors(FilesInterceptor('files', 6))
  async create(
    @User() me: UserEntity,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: CreateCertificationDto,
  ): Promise<CertificationResponseType> {
    const certification = await this.certService.create(me, data, files);
    return { certification };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Certification' })
  @ApiOkResponse({ type: CertificationResponseType })
  async getById(@Param('id') id: number): Promise<CertificationResponseType> {
    const certification = await this.certService.getById(id);
    return { certification };
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Certification' })
  @ApiOkResponse({ type: CertificationResponseType })
  @UseInterceptors(FilesInterceptor('files', 6))
  async update(
    @User() me: UserEntity,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: number,
    @Body() data: UpdateCertificationDto,
  ): Promise<CertificationResponseType> {
    const certification = await this.certService.update(id, me, data, files);
    return { certification };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Certification' })
  @ApiOkResponse({ type: CertificationResponseType })
  @UseInterceptors(FilesInterceptor('files', 6))
  async delete(
    @User() me: UserEntity,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: number,
  ): Promise<CertificationResponseType> {
    const certification = await this.certService.delete(id, me);
    return { certification };
  }
}
