import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEntity } from '../modules/role/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (!roles) {
      return true;
    }

    const userRole = await RoleEntity.findOne(user.roleId);

    const exist = roles.includes(userRole.name);
    if (exist) {
      return true;
    }
    throw new ForbiddenException('You have no access');
  }
}
