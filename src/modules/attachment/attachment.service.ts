import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { AttachmentEntity } from './attachment.entity';
import { AttachmentItemTypes } from '../../common/constants/attachment-item-types';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UploadService } from '../upload/upload.service';
import { UploadFolders } from '../../common/constants/upload-folders';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(AttachmentEntity)
    private readonly attachRepository: Repository<AttachmentEntity>,
    private readonly uploadService: UploadService,
  ) {}

  async create(
    data: CreateAttachmentDto,
    queryRunner: QueryRunner = null,
  ): Promise<AttachmentEntity> {
    const attachment = await this.attachRepository.create({ ...data });
    return queryRunner
      ? queryRunner.manager.save(attachment)
      : this.attachRepository.save(attachment);
  }

  async createMany(
    data: CreateAttachmentDto[],
    queryRunner: QueryRunner = null,
  ): Promise<AttachmentEntity[]> {
    const arrayToAdd = [];
    for (const attach of data) {
      const attachment = await this.attachRepository.create({ ...attach });
      arrayToAdd.push(attachment);
    }
    return queryRunner
      ? queryRunner.manager.save(arrayToAdd)
      : this.attachRepository.save(arrayToAdd);
  }

  async createProjectAttachments(
    projectId: number,
    files: Array<Express.Multer.File>,
    queryRunner: QueryRunner = null,
  ) {
    const uploadedFiles = await this.uploadService.uploadProjectFiles(
      projectId,
      files,
    );
    const attachments = uploadedFiles.map((file) => {
      return {
        itemType: AttachmentItemTypes.PROJECT,
        itemId: projectId,
        folder: UploadFolders.PROJECTS,
        key: file.public_id,
        url: file.url,
      };
    });
    return this.createMany(attachments, queryRunner);
  }

  async createJobAttachments(
    jobId: number,
    files: Array<Express.Multer.File>,
    queryRunner: QueryRunner = null,
  ) {
    const uploadedFiles = await this.uploadService.uploadJobFiles(jobId, files);
    const attachments = uploadedFiles.map((file) => {
      return {
        itemType: AttachmentItemTypes.JOB,
        itemId: jobId,
        folder: UploadFolders.JOBS,
        key: file.public_id,
        url: file.url,
      };
    });
    return this.createMany(attachments, queryRunner);
  }

  async createCertificationAttachments(
    certificationId: number,
    files: Array<Express.Multer.File>,
    queryRunner: QueryRunner = null,
  ) {
    const uploadedFiles = await this.uploadService.uploadCertificationFiles(
      certificationId,
      files,
    );
    const attachments = uploadedFiles.map((file) => {
      return {
        itemType: AttachmentItemTypes.CERTIFICATION,
        itemId: certificationId,
        folder: UploadFolders.CERTIFICATIONS,
        key: file.public_id,
        url: file.url,
      };
    });
    return this.createMany(attachments, queryRunner);
  }

  async createJobApplyAttachments(
    jobAppId: number,
    files: Array<Express.Multer.File>,
    queryRunner: QueryRunner = null,
  ) {
    const uploadedFiles = await this.uploadService.uploadJobApplicationFiles(
      jobAppId,
      files,
    );
    const attachments = uploadedFiles.map((file) => {
      return {
        itemType: AttachmentItemTypes.JOB_APPLICATION,
        itemId: jobAppId,
        folder: UploadFolders.JOB_APPLICATIONS,
        key: file.public_id,
        url: file.url,
      };
    });
    return this.createMany(attachments, queryRunner);
  }

  async deleteItemAttachmentsByIds(
    itemType: AttachmentItemTypes,
    itemId: number,
    ids: number[],
    queryRunner: QueryRunner = null,
  ) {
    console.log(ids);
    const keysForDelete = [];
    for (const id of ids) {
      const attach = await this.attachRepository.findOne({
        where: { id, itemType, itemId },
      });
      attach && keysForDelete.push(attach.key);
    }
    await this.uploadService.deleteFiles(keysForDelete);
    return queryRunner
      ? queryRunner.manager.delete(AttachmentEntity, ids)
      : this.attachRepository.delete(ids);
  }
}
