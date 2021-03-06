import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleType } from '../../role/types/role.type';
import { CompanyType } from '../../company/types/company.type';
import { UserLanguageType } from '../../user-language/types/user-language.type';
import { SkillType } from '../../skill/types/skill.type';
import { CategoryType } from '../../category/types/category.type';
import { SpecificationType } from '../../specification/types/specification.type';
import { EducationType } from '../../education/types/education.type';
import { WorkExperienceType } from '../../work-experience/types/work-experience.type';
import { AvatarType } from '../../avatar/types/avatar.type';
import { ProjectType } from '../../project/types/project.type';
import { CertificationType } from '../../certification/types/certification.type';

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

  @ApiPropertyOptional({ type: SkillType, isArray: true })
  skills?: SkillType[];

  @ApiPropertyOptional()
  category?: CategoryType;

  @ApiPropertyOptional()
  avatar?: AvatarType;

  @ApiPropertyOptional()
  specification?: SpecificationType;

  @ApiPropertyOptional({ type: UserLanguageType, isArray: true })
  languages?: UserLanguageType[];

  @ApiPropertyOptional({ type: EducationType, isArray: true })
  educations?: EducationType[];

  @ApiPropertyOptional({ type: ProjectType, isArray: true })
  projects?: ProjectType[];

  @ApiPropertyOptional({ type: CertificationType, isArray: true })
  certifications?: CertificationType[];

  @ApiPropertyOptional({ type: WorkExperienceType, isArray: true })
  workExperience?: WorkExperienceType[];
}

export class UserResponseType {
  @ApiProperty()
  user: UserType;
}
