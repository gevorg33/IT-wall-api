import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');
import * as sharp from 'sharp';
import * as dotenv from 'dotenv';
import CloudinaryConfigOptions from '../../config/cloudinary.config';
import { ImageMimeTypes } from '../../utils/file-validation';
dotenv.config();

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config(CloudinaryConfigOptions);
  }

  static _setQuality(size: number): string | number {
    let quality: string | number;
    const mb = (m) => m * 1024 * 1024;
    if (size <= mb(0.8)) {
      quality = 97;
    } else if (size <= mb(1.2)) {
      quality = 95;
    } else if (size <= mb(2)) {
      quality = 93;
    } else if (size <= mb(3)) {
      quality = 91;
    } else if (size <= mb(4)) {
      quality = 89;
    } else if (size <= mb(6)) {
      quality = 84;
    } else if (size <= mb(10)) {
      quality = 79;
    } else if (size <= mb(15)) {
      quality = 73;
    } else if (size <= mb(20)) {
      quality = 66;
    } else if (size <= mb(30)) {
      quality = 55;
    } else {
      quality = 80 - size > 10 ? 80 - size : 10;
    }
    return quality;
  }

  static _setSharpQuality(size: number, qualityPercent: number) {
    let quality;
    const mb = (m) => m * 1024 * 1024;
    if (size <= mb(0.8)) {
      quality = 85;
    } else if (size <= mb(1.2)) {
      quality = 80;
    } else if (size <= mb(2)) {
      quality = 70;
    } else if (size <= mb(4)) {
      quality = 65;
    } else if (size <= mb(11)) {
      quality = 60;
    } else {
      quality = 50;
    }
    return Math.round(quality * (qualityPercent / 100));
  }

  async uploadImg(
    img: Express.Multer.File,
    folder: string,
    qualityPercent: number,
  ) {
    console.log('Uploading Image ...');
    const edited = await sharp(img.buffer)
      .resize({ width: 1200 })
      .jpeg({
        quality: CloudinaryService._setSharpQuality(img.size, qualityPercent),
        // chromaSubsampling: '4:4:4',
      })
      .toBuffer({ resolveWithObject: true })
      .catch((err) => {
        console.log(err);
      });
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          url_suffix: 'it-wall',
          responsive_breakpoints: [
            {
              create_derived: false,
              bytes_step: 20000,
              min_width: 400,
              max_width: 1000,
              max_images: 3,
            },
          ],
          transformation: [
            {
              quality: CloudinaryService._setQuality(edited.info.size),
              width: 1200,
              responsive: 'true',
              dpr: 'auto',
              crop: 'scale',
              fetch_format: 'jpg',
              resource_type: 'image',
              responsive_placeholder: 'blank',
            },
          ],
          folder: `${folder}/`,
          use_filename: true,
          unique_filename: false,
          public_id: `${moment().format('DD-MM-YY_HH-mm-ss-SSS')}_${
            img.originalname
          }`,
        },
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        },
      );
      toStream(edited.data).pipe(upload);
    });
  }

  // async uploadImgMany(
  //   images: Array<Express.Multer.File>,
  //   folder: string,
  //   qualityPercent: number,
  // ) {
  //   const uploads = [];
  //   for (const img of images) {
  //     const upload = await this.uploadImg(img, folder, qualityPercent);
  //     uploads.push(upload);
  //   }
  //   return uploads;
  // }

  async uploadFile(file: Express.Multer.File, folder: string) {
    console.log('Uploading File ...');
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          url_suffix: 'it-wall',
          folder: `${folder}/`,
          use_filename: true,
          unique_filename: false,
          resource_type: 'auto',
          public_id: `${moment().format('DD-MM-YY_HH-mm-ss-SSS')}_${
            file.originalname
          }`,
        },
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        },
      );
      console.log(upload);
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadFiles(files: Array<Express.Multer.File>, folder: string) {
    const uploads = [];
    for (const file of files) {
      const upload = ImageMimeTypes.includes(file.mimetype)
        ? await this.uploadImg(file, folder, 100)
        : await this.uploadFile(file, folder);
      uploads.push(upload);
    }
    return uploads;
  }

  async delete(publicId: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  async deleteMany(keys: string[]) {
    const deleted = [];
    for (const key of keys) {
      const del = await this.delete(key);
      deleted.push(del);
    }
    return deleted;
  }

  async deleteFolder(folder: string) {
    return new Promise((resolve, reject) => {
      cloudinary.api.delete_folder(folder, function (err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}
