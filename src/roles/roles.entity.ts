import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { UserRoles } from '../constanst/main-enums';

@Entity({ name: 'roles' })
export class RolesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRoles })
  name: UserRoles;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
