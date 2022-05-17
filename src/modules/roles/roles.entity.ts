import { Entity, Column, OneToMany } from 'typeorm';
import { UserRoles } from '../../common/constants/role/user-roles';
import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'roles' })
export class RolesEntity extends AbstractEntity {
  @Column({ type: 'enum', enum: UserRoles })
  name: UserRoles;

  ///////////////////////////////// Relations /////////////////////////////////

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
