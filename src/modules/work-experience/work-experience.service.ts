import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkExperienceEntity } from './work-experience.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateOrUpdateWorkExperienceDto } from './dto/create-or-update-work-experience.dto';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectRepository(WorkExperienceEntity)
    private readonly workExpRepository: Repository<WorkExperienceEntity>,
  ) {}

  async getById(workExpId: number) {
    const workExp = await this.workExpRepository.findOne(workExpId);
    if (!workExp) {
      throw new NotFoundException('Work Experience not found');
    }
    return workExp;
  }

  async create(
    user: UserEntity,
    data: CreateOrUpdateWorkExperienceDto,
  ): Promise<WorkExperienceEntity> {
    const { title, companyName, industry, location, startDate, endDate } = data;
    const workExp = await this.workExpRepository.create({
      userId: user.id,
      title,
      companyName,
      industry,
      location,
      startDate,
      endDate,
    });
    return this.workExpRepository.save(workExp);
  }

  async update(
    workExpId: number,
    user: UserEntity,
    data: CreateOrUpdateWorkExperienceDto,
  ): Promise<WorkExperienceEntity> {
    const workExp = await this.getById(workExpId);
    if (workExp.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }
    workExp.userId = user.id;
    workExp.title = data.title;
    workExp.companyName = data.companyName;
    workExp.industry = data.industry;
    workExp.location = data.location;
    workExp.startDate = data.startDate;
    workExp.endDate = data.endDate;
    workExp.description = data.description;
    return this.workExpRepository.save(workExp);
  }

  async delete(
    workExpId: number,
    user: UserEntity,
  ): Promise<WorkExperienceEntity> {
    const workExp = await this.getById(workExpId);
    if (workExp.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }
    await this.workExpRepository.delete(workExpId);

    return workExp;
  }
}
