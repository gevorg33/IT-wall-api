import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../constanst/main-enums';
import { UserEntity } from '../user/user.entity';
import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity/base.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @ApiProperty({
    example: 'Customer',
    description: 'User role',
    enum: UserRoles,
  })
  @Column()
  name: string;

  ///////////////////////////// Relations  /////////////////////////////////
  //
  // @BelongsToMany(() => User, () => UserRole)
  // users: User[];
}
