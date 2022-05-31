import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import JwtConfigOptions from '../../config/jwt.config';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConfigOptions.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.id);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
