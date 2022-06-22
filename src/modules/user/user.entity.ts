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
import { RoleEntity } from '../role/role.entity';
import { CompanyEntity } from '../company/company.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CountryEntity } from '../country/country.entity';
import { compare } from 'bcrypt';
import { UserLanguageEntity } from '../user-language/user-language.entity';
import { CategoryEntity } from '../category/category.entity';
import { SkillEntity } from '../skill/skill.entity';
import { SpecificationEntity } from '../specification/specification.entity';
import { EducationEntity } from '../education/education.entity';
import { WorkExperienceEntity } from '../work-experience/work-experience.entity';
import { AvatarEntity } from '../avatar/avatar.entity';
import { ProjectEntity } from '../project/project.entity';
import { CertificationEntity } from '../certification/certification.entity';
import { OfferEntity } from '../offer/offer.entity';
import { JobEntity } from '../job/job.entity';
import { UserJobEntity } from '../user-job/user-job.entity';

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
  @ApiProperty({ example: 14 })
  myCompanyId: number;

  @Column()
  @ApiProperty({ example: 2 })
  roleId: number;

  @Column({ nullable: true })
  @ApiProperty({ example: 13 })
  countryId: number;

  @Column({ nullable: true })
  @ApiProperty({ example: 15 })
  categoryId: number;

  @Column({ nullable: true })
  @ApiProperty({ example: 21 })
  specificationId: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'About User...' })
  about: string;

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

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @ManyToMany(() => CompanyEntity, (company) => company.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  companies: CompanyEntity[];

  @OneToMany(() => SkillEntity, (skill) => skill.user)
  skills: SkillEntity[];

  @OneToMany(() => UserLanguageEntity, (userLanguage) => userLanguage.user)
  userLanguages: UserLanguageEntity[];

  @OneToMany(() => EducationEntity, (education) => education.user)
  educations: EducationEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.user)
  projects: ProjectEntity[];

  @OneToMany(() => CertificationEntity, (cert) => cert.user)
  certifications: CertificationEntity[];

  @OneToOne(() => AvatarEntity, (avatar) => avatar.user)
  avatar: AvatarEntity;

  @OneToMany(() => WorkExperienceEntity, (workExp) => workExp.user)
  workExperience: WorkExperienceEntity[];

  @OneToMany(() => JobEntity, (job) => job.publisher)
  publishedJobs: JobEntity[];

  @OneToMany(() => OfferEntity, (offer) => offer.user)
  offers: OfferEntity[];

  @OneToMany(() => UserJobEntity, (userJob) => userJob.user)
  userJobs: UserJobEntity[];

  @ManyToOne(() => CountryEntity, (country) => country.users)
  @JoinColumn({ name: 'countryId' })
  country: CountryEntity;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @ManyToOne(() => SpecificationEntity)
  @JoinColumn({ name: 'specificationId' })
  specification: SpecificationEntity;
}
