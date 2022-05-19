import { ApiProperty } from '@nestjs/swagger';
import { LanguageType } from './language.type';

export class LanguagesListType {
  @ApiProperty({ type: LanguageType, isArray: true })
  languages: LanguageType[];
}
