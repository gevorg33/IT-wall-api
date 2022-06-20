import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProjectEntity } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { AttachmentService } from '../attachment/attachment.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AttachmentItemTypes } from '../../common/constants/attachment-item-types';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    private readonly attachmentService: AttachmentService,
  ) {}

  async getById(projectId: number): Promise<ProjectEntity> {
    const project = this.projectRepository.findOne(projectId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async create(
    user: UserEntity,
    { title, description }: CreateProjectDto,
    files: Array<Express.Multer.File>,
  ): Promise<ProjectEntity> {
    const queryRunner = getConnection().createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      let project = await this.projectRepository.create({
        userId: user.id,
        title,
        description,
      });
      project = await queryRunner.manager.save(project);

      await this.attachmentService.createProjectAttachments(
        project.id,
        files,
        queryRunner,
      );

      await queryRunner.commitTransaction();
      return this.getById(project.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }

  async update(
    projectId: number,
    user: UserEntity,
    { title, description, attachmentIdsForDelete }: UpdateProjectDto,
    files: Array<Express.Multer.File>,
  ): Promise<ProjectEntity> {
    const project = await this.getById(projectId);
    if (project.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }

    const attachIdsForDelete = JSON.parse(attachmentIdsForDelete);
    const queryRunner = getConnection().createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      project.title = title;
      project.description = description;

      await this.attachmentService.createProjectAttachments(
        project.id,
        files,
        queryRunner,
      );

      await this.attachmentService.deleteItemAttachmentsByIds(
        AttachmentItemTypes.PROJECT,
        project.id,
        attachIdsForDelete,
        queryRunner,
      );

      const updated = await queryRunner.manager.save(project);
      await queryRunner.commitTransaction();
      return this.getById(updated.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }

  async delete(projectId: number, user: UserEntity): Promise<ProjectEntity> {
    const project = await this.getById(projectId);
    if (project.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }

    const queryRunner = getConnection().createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await this.attachmentService.deleteItemAttachmentsByIds(
        AttachmentItemTypes.PROJECT,
        project.id,
        project.attachments.map((attach) => attach.id),
        queryRunner,
      );

      await this.projectRepository.delete(project.id);

      await queryRunner.commitTransaction();

      return project;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }
}
