import { ApiProperty } from '@nestjs/swagger';
import { LanguageLevels } from '../../../common/constants/prof-levels';

export class LanguageLevelType {
  @ApiProperty({ enum: LanguageLevels, example: LanguageLevels.ELEMENTARY })
  level: LanguageLevels;
}

export class LanguageLevelsListType {
  @ApiProperty({ type: LanguageLevelType, isArray: true })
  levels: LanguageLevelType[];
}
