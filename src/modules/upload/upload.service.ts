import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../../shared/services/cloudinary.service';
import { UploadFolders } from '../../common/constants/upload-folders';

@Injectable()
export class UploadService {
  constructor(private readonly uService: CloudinaryService) {}

  async uploadAvatar(userId: number, avatar: Express.Multer.File) {
    avatar.originalname = `user-${userId}`;
    return this.uService.uploadImg(avatar, UploadFolders.AVATARS, 90);
  }

  async uploadProjectFiles(
    projectId: number,
    files: Array<Express.Multer.File>,
  ) {
    files = files.map((file) => {
      file.originalname = `project-${projectId}`;
      return file;
    });
    return this.uService.uploadFiles(files, UploadFolders.PROJECTS);
  }

  async uploadJobFiles(jobId: number, files: Array<Express.Multer.File>) {
    files = files.map((file) => {
      file.originalname = `job-${jobId}`;
      return file;
    });
    return this.uService.uploadFiles(files, UploadFolders.JOBS);
  }

  async uploadCertificationFiles(
    certificationId: number,
    files: Array<Express.Multer.File>,
  ) {
    files = files.map((file) => {
      file.originalname = `certification-${certificationId}`;
      return file;
    });
    return this.uService.uploadFiles(files, UploadFolders.CERTIFICATIONS);
  }

  async deleteFile(key: string) {
    return this.uService.delete(key);
  }

  async deleteFiles(keys: string[]) {
    return this.uService.deleteMany(keys);
  }

  async deleteFolder(folder: string) {
    return this.uService.deleteFolder(folder);
  }
}
