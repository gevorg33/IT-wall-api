import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './user.type';
import { RoleType } from '../../roles/types/role.type';

export class UserTokenType extends UserType {
  @ApiProperty({ type: RoleType })
  role: RoleType;

  @ApiProperty({ example: 'iuh378ed378hq9ad1n83...' })
  token?: string;
}

export class UserTokenResponseType {
  user: UserTokenType;
}
