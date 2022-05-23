import { ApiProperty } from '@nestjs/swagger';
import { ProfessionType } from './profession.type';

export class ProfessionsListType {
  @ApiProperty({ type: ProfessionType, isArray: true })
  professions: ProfessionType[];
}
