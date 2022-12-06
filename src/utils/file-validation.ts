export const ImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

export const AvatarSize = 1024 * 1024 * 10;

export const CertificationSize = 1024 * 1024 * 10;

export const ProjectSize = 1024 * 1024 * 10;

export const JobSize = 1024 * 1024 * 10;

export const JobAppSize = 1024 * 1024 * 10;

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
