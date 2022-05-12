import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { Reflector } from '@nestjs/core';
import { Payee } from '../models/payee.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    if (user instanceof UserEntity) {
      const exist = user.roles.find((r) => roles.includes(r.name));
      if (exist) return true;
    } else if (user instanceof Payee && roles.includes('Payee')) {
      return true;
    }
    throw new ForbiddenException('Not Permitted, You have no access');
  }
}
