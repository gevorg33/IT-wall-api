import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { hash } from 'bcrypt';
import { RolesEntity } from '../roles/roles.entity';
import { CompanyEntity } from '../company/company.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CountryEntity } from '../country/country.entity';
import { compare } from 'bcrypt';
import { UserLanguageEntity } from '../user-language/user-language.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ length: 30 })
  @ApiProperty()
  firstName: string;

  @Column({ length: 30 })
  @ApiProperty()
  lastName: string;

  @Column({ length: 100 })
  @ApiProperty()
  email: string;

  @Column({ length: 20 })
  @ApiProperty()
  phoneNumber: string;

  @Column({ select: false })
  @ApiProperty()
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ example: '14' })
  myCompanyId: number;

  @Column()
  @ApiProperty({ example: '2' })
  roleId: number;

  @Column({ nullable: true })
  @ApiProperty({ example: '13' })
  countryId: number;

  ///////////////////////////////// Triggers /////////////////////////////////

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password);
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

  // @ManyToMany(() => LanguageEntity, (language) => language.users)
  // @JoinTable({
  //   name: 'users_languages',
  //   joinColumn: {
  //     name: 'userId',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'languageId',
  //     referencedColumnName: 'id',
  //   },
  // })
  // languages: LanguageEntity[];

  @OneToMany(() => UserLanguageEntity, (userLanguage) => userLanguage.user)
  userLanguages: UserLanguageEntity[];

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'countryId' })
  country: CountryEntity;
}
