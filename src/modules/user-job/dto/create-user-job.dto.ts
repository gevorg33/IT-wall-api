import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserJobPermissions } from '../../../common/constants/user-job-permissions';

export class CreateUserJobDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 48 })
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 48 })
  jobId: number;

  @IsNotEmpty()
  @IsEnum(UserJobPermissions)
  @ApiProperty({
    enum: UserJobPermissions,
    example: UserJobPermissions.PUBLISHER,
  })
  permission: UserJobPermissions;
}
