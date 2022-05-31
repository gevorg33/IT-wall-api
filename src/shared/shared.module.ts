import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import JwtConfigOptions from '../config/jwt.config';
import { CloudinaryService } from './services/cloudinary.service';

const providers = [CloudinaryService];

@Global()
@Module({
  providers,
  imports: [JwtModule.register(JwtConfigOptions)],
  exports: [...providers, JwtModule],
})
export class SharedModule {}
