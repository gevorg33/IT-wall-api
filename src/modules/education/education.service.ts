import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { EducationEntity } from './education.entity';
import { CreateOrUpdateEducationDto } from './dto/create-or-update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(EducationEntity)
    private readonly educationRepository: Repository<EducationEntity>,
  ) {}

  async getById(workExpId: number) {
    const workExp = await this.educationRepository.findOne(workExpId);
    if (!workExp) {
      throw new NotFoundException('Work Experience not found');
    }
    return workExp;
  }

  async create(
    user: UserEntity,
    data: CreateOrUpdateEducationDto,
  ): Promise<EducationEntity> {
    const {
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      description,
    } = data;
    const education = await this.educationRepository.create({
      userId: user.id,
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      description,
    });
    return this.educationRepository.save(education);
  }

  async update(
    educationId: number,
    user: UserEntity,
    data: CreateOrUpdateEducationDto,
  ): Promise<EducationEntity> {
    const education = await this.getById(educationId);
    if (education.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }

    education.userId = user.id;
    education.institution = data.institution;
    education.fieldOfStudy = data.fieldOfStudy;
    education.degree = data.degree;
    education.startDate = data.startDate;
    education.endDate = data.endDate;
    education.description = data.description;
    return this.educationRepository.save(education);
  }

  async delete(
    educationId: number,
    user: UserEntity,
  ): Promise<EducationEntity> {
    const education = await this.getById(educationId);
    if (education.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }
    await this.educationRepository.delete(educationId);

    return education;
  }
}
