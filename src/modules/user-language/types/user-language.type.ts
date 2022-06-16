import { ApiProperty } from '@nestjs/swagger';
import { LanguageLevels } from '../../../common/constants/language-levels';
import { LanguageType } from '../../language/types/language.type';

export class UserLanguageType {
  @ApiProperty({ enum: LanguageLevels, example: LanguageLevels.ELEMENTARY })
  level: LanguageLevels;

  @ApiProperty({ type: LanguageType })
  language: LanguageType;
}

export class UserLanguageResponseType {
  @ApiProperty()
  userLanguage: UserLanguageType;
}
