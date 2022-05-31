import { Entity, Column, OneToMany } from 'typeorm';
import { UserRoles } from '../../common/constants/user-roles';
import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'roles' })
export class RoleEntity extends AbstractEntity {
  @Column({ type: 'enum', enum: UserRoles })
  @ApiProperty()
  name: UserRoles;

  ///////////////////////////////// Relations /////////////////////////////////

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
