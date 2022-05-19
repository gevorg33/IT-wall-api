import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import JwtOptions from '../config/jwt.config';

const providers = [];

@Global()
@Module({
  providers,
  imports: [JwtModule.register(JwtOptions)],
  exports: [...providers, JwtModule],
})
export class SharedModule {}
