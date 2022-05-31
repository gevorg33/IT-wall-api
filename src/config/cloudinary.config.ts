import * as dotenv from 'dotenv';
dotenv.config();

const CloudinaryConfigOptions = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};
export default CloudinaryConfigOptions;
