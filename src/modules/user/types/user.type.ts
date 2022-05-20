import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleType } from '../../roles/types/role.type';
import { LanguageType } from '../../language/types/language.type';
import { ProfLevelType } from '../../prof-level/types/prof-level.type';
import { CompanyType } from '../../company/types/company.type';

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

  @ApiPropertyOptional({ type: LanguageType, isArray: true })
  languages?: LanguageType[];

  @ApiPropertyOptional({ type: ProfLevelType, isArray: true })
  profLevels?: ProfLevelType[];
}

export class UserResponseType {
  @ApiProperty()
  user: UserType;
}
