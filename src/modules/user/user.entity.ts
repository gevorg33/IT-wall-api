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
import { ApiProperty } from '@nestjs/swagger';
import { ProfLevelEntity } from '../prof-level/prof-level.entity';
import { LanguageEntity } from '../language/language.entity';
import { CountryEntity } from '../country/country.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  toJSON() {
    return instanceToPlain(this);
  }

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
  @Exclude()
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

  @ManyToMany(() => ProfLevelEntity)
  @JoinTable({
    name: 'users_prof_levels',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'profLevelId',
      referencedColumnName: 'id',
    },
  })
  profLevels: ProfLevelEntity[];

  @ManyToMany(() => LanguageEntity)
  @JoinTable({
    name: 'users_languages',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'languageId',
      referencedColumnName: 'id',
    },
  })
  languages: LanguageEntity[];

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'countryId' })
  country: CountryEntity;
}
