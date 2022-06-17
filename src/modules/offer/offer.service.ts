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
import { CreateOfferDto } from './dto/create-offer.dto';
import {OfferResponseType, OffersResponseType} from './types/offer.type';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerRepository: Repository<OfferEntity>,
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
    const offer = this.offerRepository.findOne(offerId);
    if (!offer) {
      throw new NotFoundException('Job offer not found');
    }
    return offer;
  }

  async create(user: UserEntity, data: CreateOfferDto): Promise<OfferEntity> {
    const { jobId, budgetPrice, offerPrice, title, description } = data;
    const offer = await this.offerRepository.create({
      userId: user.id,
      jobId,
      budgetPrice,
      offerPrice,
      title,
      description,
    });
    return this.offerRepository.save(offer);
  }

  async update(
    offerId: number,
    user: UserEntity,
    data: CreateOfferDto,
  ): Promise<OfferEntity> {
    const offer = await this.getById(offerId);
    if (offer.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }

    offer.userId = user.id;
    offer.budgetPrice = data.budgetPrice;
    offer.offerPrice = data.offerPrice;
    offer.title = data.title;
    offer.description = data.description;

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
