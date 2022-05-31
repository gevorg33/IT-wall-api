import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from './skill.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillsRepository: Repository<SkillEntity>,
  ) {}

  async create(
    user: UserEntity,
    { name }: CreateSkillDto,
  ): Promise<SkillEntity> {
    const skill = await this.skillsRepository.create({ userId: user.id, name });
    return this.skillsRepository.save(skill);
  }

  async delete(user: UserEntity, id: number): Promise<SkillEntity> {
    const skill = await this.skillsRepository.findOne(id);
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    if (skill.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }
    await this.skillsRepository.delete(id);
    return skill;
  }
}
