import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { OfferEntity } from './offer.entity';
import { UserEntity } from '../user/user.entity';
import { JobEntity } from '../job/job.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { UpdateOfferStatusDto } from './dto/update-offer-status.dto';
import { OfferStatuses } from '../../common/constants/offer-statuses';
import { UserJobPermissions } from '../../common/constants/user-job-permissions';
import { UserJobService } from '../user-job/user-job.service';
import { GetOffersDto } from './dto/get-offers.dto';
import { JobService } from '../job/job.service';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerRepository: Repository<OfferEntity>,
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
    private readonly jobService: JobService,
    private readonly userJobService: UserJobService,
  ) {}

  async getOffersByJobId(
    user: UserEntity,
    { jobId, status }: GetOffersDto,
  ): Promise<OfferEntity[]> {
    const job = await this.jobService.getById(jobId);

    if (job.publisherId !== user.id) {
      throw new ForbiddenException('You have no access');
    }

    const queryBuilder = await this.offerRepository
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.user', 'user')
      .leftJoinAndSelect('offer.toUser', 'toUser')
      .where('offer.jobId = :jobId', { jobId });

    if (status) {
      await queryBuilder.andWhere('offer.status = :status', { status });
    }

    return queryBuilder.getMany();
  }

  async getById(id: number): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOne(id);
    if (!offer) throw new NotFoundException('Offer not found');

    return offer;
  }

  async getOfferData(user: UserEntity, id: number): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOne(id, {
      relations: ['user', 'toUser', 'job'],
    });
    if (!offer) throw new NotFoundException('Offer not found');

    return offer;
  }

  async create(user: UserEntity, data: CreateOfferDto): Promise<OfferEntity> {
    const { jobId, budgetPrice, offerPrice, title, cover } = data;

    const job = await this.jobRepository.findOne(jobId);
    if (!job) throw new NotFoundException('Job not found');

    if (user.id === job.publisherId) {
      throw new NotAcceptableException('You are publisher of this job');
    }

    const existed = await this.offerRepository.findOne({
      jobId,
      userId: user.id,
      toUserId: job.publisherId,
    });

    if (existed) {
      existed.budgetPrice = budgetPrice;
      existed.offerPrice = offerPrice;
      existed.title = title;
      existed.cover = cover;

      return this.offerRepository.save(existed);
    } else {
      const offer = await this.offerRepository.create({
        jobId,
        budgetPrice,
        offerPrice,
        title,
        cover,
        userId: user.id,
        toUserId: job.publisherId,
      });
      return this.offerRepository.save(offer);
    }
  }

  async newOffer(
    user: UserEntity,
    parentId: number,
    data: UpdateOfferDto,
  ): Promise<OfferEntity> {
    const { budgetPrice, offerPrice, title, cover } = data;

    const parent = await this.offerRepository.findOne(parentId);
    if (!parent) throw new NotFoundException('Parent offer not found');

    let toUserId = parent.userId;
    if (toUserId === user.id) {
      toUserId = parent.toUserId;
    }

    parent.budgetPrice = budgetPrice;
    parent.offerPrice = offerPrice;
    parent.title = title;
    parent.cover = cover;
    parent.toUserId = toUserId;
    parent.userId = user.id;

    return this.offerRepository.save(parent);
  }

  async update(
    id: number,
    user: UserEntity,
    data: UpdateOfferDto,
  ): Promise<OfferEntity> {
    const offer = await this.getById(id);
    if (offer.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }

    offer.userId = user.id;
    offer.budgetPrice = data.budgetPrice;
    offer.offerPrice = data.offerPrice;
    offer.title = data.title;
    offer.cover = data.cover;

    return this.offerRepository.save(offer);
  }

  async updateStatus(
    id: number,
    user: UserEntity,
    { status }: UpdateOfferStatusDto,
  ): Promise<OfferEntity> {
    const offer = await this.getById(id);

    if (user.id !== offer.userId && user.id !== offer.toUserId) {
      throw new ForbiddenException('You have no access');
    }

    if (status === OfferStatuses.PENDING) return;

    const job = await this.jobRepository.findOne(offer.jobId);

    offer.status = status;

    const queryRunner = getConnection().createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.save(offer);

      if (status === OfferStatuses.ACCEPT) {
        await this.userJobService.create(
          {
            userId:
              job.publisherId !== offer.userId ? offer.userId : offer.toUserId,
            jobId: offer.jobId,
            permission: UserJobPermissions.USER,
          },
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();

      return offer;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }

  async delete(offerId: number, user: UserEntity): Promise<OfferEntity> {
    const offer = await this.getById(offerId);
    if (offer.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }
    await this.offerRepository.delete(offerId);

    return offer;
  }
}
