import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { JobEntity } from './job.entity';
import { UserEntity } from '../user/user.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { AttachmentService } from '../attachment/attachment.service';
import { UpdateJobDto } from './dto/update-job.dto';
import { AttachmentItemTypes } from '../../common/constants/attachment-item-types';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
    private readonly attachmentService: AttachmentService,
  ) {}

  async getById(jobId: number) {
    const job = await this.jobRepository.findOne(jobId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async create(
    user: UserEntity,
    data: CreateJobDto,
    files: Array<Express.Multer.File>,
  ): Promise<JobEntity> {
    const {
      title,
      description,
      categoryId,
      level,
      budgetPrice,
      paymentDetails,
    } = data;

    const queryRunner = getConnection().createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      let job = this.jobRepository.create({
        userId: user.id,
        title,
        description,
        categoryId,
        level,
        budgetPrice,
        paymentDetails,
      });
      job = await queryRunner.manager.save(job);

      await this.attachmentService.createJobAttachments(
        job.id,
        files,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return this.getById(job.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }

  async update(
    jobId: number,
    user: UserEntity,
    data: UpdateJobDto,
    files: Array<Express.Multer.File>,
  ): Promise<JobEntity> {
    const job = await this.getById(jobId);
    if (job.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }

    const {
      title,
      description,
      attachmentIdsForDelete,
      categoryId,
      level,
      budgetPrice,
      paymentDetails,
    } = data;

    const attachIdsForDelete = JSON.parse(attachmentIdsForDelete);
    const queryRunner = getConnection().createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      job.title = title;
      job.description = description;
      job.categoryId = categoryId;
      job.level = level;
      job.budgetPrice = budgetPrice;
      job.paymentDetails = paymentDetails;

      await this.attachmentService.createJobAttachments(
        job.id,
        files,
        queryRunner,
      );

      await this.attachmentService.deleteItemAttachmentsByIds(
        AttachmentItemTypes.JOBS,
        job.id,
        attachIdsForDelete,
        queryRunner,
      );
      const updated = await queryRunner.manager.save(job);
      await queryRunner.commitTransaction();
      return this.getById(updated.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }

  async delete(jobId: number, user: UserEntity): Promise<JobEntity> {
    const job = await this.getById(jobId);
    if (job.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }
    const queryRunner = getConnection().createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await this.attachmentService.deleteItemAttachmentsByIds(
        AttachmentItemTypes.JOBS,
        job.id,
        job.attachments.map((attach) => attach.id),
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return job;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }
}