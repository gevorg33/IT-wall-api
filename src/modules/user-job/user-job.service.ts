import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserJobEntity } from './user-job.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CreateUserJobDto } from './dto/create-user-job.dto';

@Injectable()
export class UserJobService {
  constructor(
    @InjectRepository(UserJobEntity)
    private readonly userJobRepository: Repository<UserJobEntity>,
  ) {}

  async create(
    data: CreateUserJobDto,
    queryRunner: QueryRunner = null,
  ): Promise<UserJobEntity> {
    const userJob = await this.userJobRepository.create(data);
    return queryRunner
      ? queryRunner.manager.save(UserJobEntity, userJob)
      : this.userJobRepository.save(userJob);
  }
}
