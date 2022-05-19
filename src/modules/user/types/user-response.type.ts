import { UserType } from './user.type';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseType {
  @ApiProperty()
  user: UserType;
}
