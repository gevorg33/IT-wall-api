import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleType } from '../../roles/types/role.type';
import { CompanyType } from '../../company/types/company.type';
import { UserLanguageType } from '../../user-language/types/user-language.type';

export class UserType {
  @ApiProperty({ example: 23 })
  id: number;

  @ApiProperty({ example: 'Jon' })
  firstName: string;

  @ApiProperty({ example: 'Smith' })
  lastName: string;

  @ApiProperty({ example: '+37477889900' })
  phoneNumber: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: 2 })
  roleId: number;

  @ApiProperty()
  role: RoleType;

  @ApiPropertyOptional()
  myCompany?: CompanyType;

  @ApiPropertyOptional({ type: UserLanguageType, isArray: true })
  languages?: UserLanguageType[];
}

export class UserResponseType {
  @ApiProperty()
  user: UserType;
}
