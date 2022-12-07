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
import { UserJobService } from '../user-job/user-job.service';
import { UserJobPermissions } from '../../common/constants/user-job-permissions';
import { GetMyJobsDto } from './dto/get-jobs-filters.dto';
import { JobStatuses } from '../../common/constants/job-statuses';
import { SearchJobsDto } from './dto/search-jobs.dto';
import { UserRoles } from '../../common/constants/user-roles';
import { UserJobEntity } from '../user-job/user-job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
    private readonly attachmentService: AttachmentService,
    private readonly userJobService: UserJobService,
    @InjectRepository(UserJobEntity)
    private readonly userJobRepository: Repository<UserJobEntity>,
  ) {}

  async getById(jobId: number) {
    const job = await this.jobRepository.findOne(jobId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async getMyJobs(user: UserEntity, { status, permission }: GetMyJobsDto) {
    if (!permission) {
      permission =
        user.role.name === UserRoles.CUSTOMER
          ? UserJobPermissions.PUBLISHER
          : UserJobPermissions.USER;
    }
    const queryBuilder = await this.userJobRepository
      .createQueryBuilder('userJob')
      .leftJoinAndSelect('userJob.job', 'job')
      .where('userJob.userId = :uId', { uId: user.id })
      .andWhere('userJob.permission = :permission', { permission });

    if (status) {
      await queryBuilder.andWhere('job.status = :status', { status });
    }

    const userJobs = await queryBuilder.getMany();

    return userJobs.map((uj) => {
      return { ...uj.job, permission: uj.permission };
    });
  }

  async search(user: UserEntity, { q }: SearchJobsDto) {
    const queryBuilder = await this.jobRepository
      .createQueryBuilder('job')
      .where('job.status = :status', { status: JobStatuses.NO_STATUS });

    if (q) {
      await queryBuilder.where(
        'job.title iLIKE :q OR job.description iLIKE :q',
        {
          q: `%${q}%`,
        },
      );
    }

    return queryBuilder.getMany();
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
        publisherId: user.id,
        title,
        description,
        categoryId,
        level,
        budgetPrice,
        paymentDetails,
        countryId: user.countryId,
      });
      job = await queryRunner.manager.save(job);

      await this.userJobService.create(
        {
          userId: user.id,
          jobId: job.id,
          permission: UserJobPermissions.PUBLISHER,
        },
        queryRunner,
      );

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
    if (job.publisherId !== user.id) {
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
      job.countryId = user.countryId;

      await this.attachmentService.createJobAttachments(
        job.id,
        files,
        queryRunner,
      );

      await this.attachmentService.deleteItemAttachmentsByIds(
        AttachmentItemTypes.JOB,
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
    if (job.publisherId !== user.id) {
      throw new ForbiddenException('You have no access');
    }
    const queryRunner = getConnection().createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await this.attachmentService.deleteItemAttachmentsByIds(
        AttachmentItemTypes.JOB,
        job.id,
        job.attachments.map((attach) => attach.id),
        queryRunner,
      );

      await this.jobRepository.delete(job.id);

      await queryRunner.commitTransaction();

      return job;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }
}
