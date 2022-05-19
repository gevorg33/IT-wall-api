import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './user.type';
import { RoleType } from '../../roles/types/role.type';
import { CompanyType } from '../../company/types/company.type';

export class UserTokenType extends UserType {
  @ApiProperty()
  role: RoleType;

  @ApiProperty()
  myCompany?: CompanyType;

  @ApiProperty({ example: 'iuh378ed378hq9ad1n83...' })
  accessToken: string;
}

export class UserTokenResponseType {
  @ApiProperty()
  user: UserTokenType;
}
