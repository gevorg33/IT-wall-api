import { Injectable, NotAcceptableException } from '@nestjs/common';
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
    const existed = await this.userJobRepository.findOne({
      userId: data.userId,
      jobId: data.jobId,
    });

    if (!existed) {
      const userJob = await this.userJobRepository.create(data);
      return queryRunner
        ? queryRunner.manager.save(UserJobEntity, userJob)
        : this.userJobRepository.save(userJob);
    } else if (existed.permission !== data.permission) {
      throw new NotAcceptableException('You are already have this job');
    }

    return existed;
  }
}
