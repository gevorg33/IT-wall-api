import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { hash } from 'bcrypt';
import { RolesEntity } from '../roles/roles.entity';
import { CompanyEntity } from '../company/company.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  toJSON() {
    return instanceToPlain(this);
  }

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  myCompanyId: number;

  @Column()
  roleId: number;

  ///////////////////////////////// Triggers /////////////////////////////////

  @Exclude()
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  ///////////////////////////////// Relations /////////////////////////////////

  @OneToOne(() => CompanyEntity, (company) => company.owner, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'myCompanyId' })
  myCompany: CompanyEntity;

  @ManyToOne(() => RolesEntity, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  role: RolesEntity;

  @ManyToMany(() => CompanyEntity, (company) => company.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  companies: CompanyEntity[];
}
