import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from './role.type';

export class RolesListType {
  @ApiProperty({ type: RoleType, isArray: true })
  roles: RoleType[];
}
