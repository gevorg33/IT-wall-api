import { ApiProperty } from '@nestjs/swagger';
import { SkillType } from './skill.type';

export class SkillsListType {
  @ApiProperty({ type: SkillType, isArray: true })
  skills: SkillType[];
}
