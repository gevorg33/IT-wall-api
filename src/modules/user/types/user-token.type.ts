import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './user.type';

export class UserTokenType extends UserType {
  @ApiProperty({ example: 'iuh378ed378hq9ad1n83...' })
  accessToken: string;
}

export class UserTokenResponseType {
  @ApiProperty()
  user: UserTokenType;
}
