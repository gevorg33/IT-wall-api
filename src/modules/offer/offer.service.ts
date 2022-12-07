import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferEntity } from './offer.entity';
import { UserEntity } from '../user/user.entity';
import { JobEntity } from '../job/job.entity';
import { CreateUpdateOfferDto } from './dto/create-update-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerRepository: Repository<OfferEntity>,
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  async getOffersByJobId(jobId: number): Promise<JobEntity[]> {
    const currentJobOffers = await this.jobRepository
      .createQueryBuilder('jobs')
      .leftJoinAndSelect('jobs.offers', 'offers')
      .where('jobs.id = :id', { jobId })
      .getMany();
    if (!currentJobOffers) {
      throw new NotFoundException('Job offers not found');
    }
    return currentJobOffers;
  }

  async getById(offerId: number): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOne(offerId);
    console.log(offer);
    if (!offer) {
      throw new NotFoundException('Job offer not found');
    }
    return offer;
  }

  async create(
    user: UserEntity,
    data: CreateUpdateOfferDto,
  ): Promise<OfferEntity> {
    const { jobId, budgetPrice, offerPrice, title, cover } = data;
    const offer = await this.offerRepository.create({
      userId: user.id,
      jobId,
      budgetPrice,
      offerPrice,
      title,
      cover,
    });
    return this.offerRepository.save(offer);
  }

  async update(
    offerId: number,
    user: UserEntity,
    data: CreateUpdateOfferDto,
  ): Promise<OfferEntity> {
    const offer = await this.getById(offerId);
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

  async delete(offerId: number, user: UserEntity): Promise<OfferEntity> {
    const offer = await this.getById(offerId);
    if (offer.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }
    await this.offerRepository.delete(offerId);

    return offer;
  }
}
