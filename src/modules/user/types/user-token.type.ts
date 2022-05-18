import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './user.type';
import { RoleDto } from '../../roles/types/role.dto';

export class UserTokenType extends UserType {
  @ApiProperty({ type: RoleDto })
  role: RoleDto;

  @ApiProperty({ example: 'iuh378ed378hq9ad1n83...' })
  token?: string;
}

export class UserTokenResponseType {
  user: UserTokenType;
}
