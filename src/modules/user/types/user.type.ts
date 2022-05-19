import { ApiProperty } from '@nestjs/swagger';

export class UserType {
  @ApiProperty({ example: 23 })
  id: number;

  @ApiProperty({ example: 'Jon' })
  firstName: string;

  @ApiProperty({ example: 'Smith' })
  lastName: string;

  @ApiProperty({ example: '+37477889900' })
  phoneNumber: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email: string;
}

export class UserResponseType {
  @ApiProperty()
  user: UserType;
}
