import { ApiProperty } from '@nestjs/swagger';
import { UserLanguageType } from './user-language.type';

export class UserLanguageListType {
  @ApiProperty({ type: UserLanguageType, isArray: true })
  levels: UserLanguageType[];
}
