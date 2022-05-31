import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../../common/constants/user-roles';

export class RoleType {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: UserRoles.FREELANCER })
  name: string;
}
