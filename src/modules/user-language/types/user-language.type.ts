import { ApiProperty } from '@nestjs/swagger';
import { LanguageLevels } from '../../../common/constants/prof-levels';
import { LanguageType } from '../../language/types/language.type';

export class UserLanguageType {
  @ApiProperty({ enum: LanguageLevels, example: LanguageLevels.ELEMENTARY })
  level: LanguageLevels;

  @ApiProperty({ type: LanguageType })
  language: LanguageType;
}
