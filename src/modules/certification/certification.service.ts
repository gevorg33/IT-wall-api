import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { AttachmentService } from '../attachment/attachment.service';
import { UserEntity } from '../user/user.entity';
import { CertificationEntity } from './certification.entity';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { AttachmentItemTypes } from '../../common/constants/attachment-item-types';

@Injectable()
export class CertificationService {
  constructor(
    @InjectRepository(CertificationEntity)
    private readonly certRepository: Repository<CertificationEntity>,
    private readonly attachmentService: AttachmentService,
  ) {}

  async getById(certificationId: number): Promise<CertificationEntity> {
    const certification = this.certRepository.findOne(certificationId);
    if (!certification) {
      throw new NotFoundException('Certification not found');
    }
    return certification;
  }

  async create(
    user: UserEntity,
    { title, companyName, level, issued }: CreateCertificationDto,
    files: Array<Express.Multer.File>,
  ): Promise<CertificationEntity> {
    const queryRunner = getConnection().createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      let certification = await this.certRepository.create({
        userId: user.id,
        title,
        companyName,
        level,
        issued,
      });
      certification = await queryRunner.manager.save(certification);

      await this.attachmentService.createCertificationAttachments(
        certification.id,
        files,
        queryRunner,
      );

      await queryRunner.commitTransaction();
      return this.getById(certification.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }

  async update(
    certificationId: number,
    user: UserEntity,
    {
      title,
      companyName,
      level,
      issued,
      attachmentIdsForDelete,
    }: UpdateCertificationDto,
    files: Array<Express.Multer.File>,
  ): Promise<CertificationEntity> {
    const certification = await this.getById(certificationId);
    if (certification.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }

    const attachIdsForDelete = JSON.parse(attachmentIdsForDelete);
    const queryRunner = getConnection().createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      certification.title = title;
      certification.companyName = companyName;
      certification.level = level;
      certification.issued = issued;

      await this.attachmentService.createCertificationAttachments(
        certification.id,
        files,
        queryRunner,
      );

      await this.attachmentService.deleteItemAttachmentsByIds(
        AttachmentItemTypes.CERTIFICATION,
        certification.id,
        attachIdsForDelete,
        queryRunner,
      );

      const updated = await queryRunner.manager.save(certification);
      await queryRunner.commitTransaction();
      return this.getById(updated.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }

  async delete(certificationId: number, user: UserEntity) {
    const certification = await this.getById(certificationId);
    if (certification.userId !== user.id) {
      throw new ForbiddenException('You have no access');
    }

    const queryRunner = getConnection().createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await this.attachmentService.deleteItemAttachmentsByIds(
        AttachmentItemTypes.CERTIFICATION,
        certification.id,
        certification.attachments.map((attach) => attach.id),
        queryRunner,
      );

      await this.certRepository.delete(certification.id);

      await queryRunner.commitTransaction();

      return certification;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    }
  }
}
