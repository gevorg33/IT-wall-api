import { ApiProperty } from '@nestjs/swagger';
import { ProfLevelType } from '../../prof-level/types/prof-level.type';

export class ProfLevelListType {
  @ApiProperty({ type: ProfLevelType, isArray: true })
  levels: ProfLevelType[];
}
