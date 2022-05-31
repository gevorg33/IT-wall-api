import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoles } from '../../common/constants/user-roles';
import { RoleEntity } from '../role/role.entity';
import { CompanyEntity } from '../company/company.entity';
import { UserType } from './types/user.type';
import { UpdateUserAboutDto } from './dto/update-user-about.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.getByEmail(createUserDto.email);
    if (userByEmail) {
      throw new BadRequestException('Email are already taken');
    }
    const role = await this.rolesRepository.findOne(createUserDto.roleId);
    const newUser = await this.userRepository.create({
      ...createUserDto,
      roleId: role.id,
    });
    if (role.name === UserRoles.COMPANY) {
      if (!createUserDto.company) {
        throw new BadRequestException('company should not be empty');
      }
      newUser.myCompany = await this.companyRepository.save(
        createUserDto.company,
      );
    }
    return this.userRepository.save(newUser);
  }

  async getByEmail(email: string, getPassword = false): Promise<UserEntity> {
    const queryBuilder = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });
    if (getPassword) {
      await queryBuilder.addSelect('user.password');
    }
    return queryBuilder.getOne();
  }

  async getUserFullData(id: number): Promise<UserType> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.myCompany', 'myCompany')
      .leftJoinAndSelect('user.country', 'country')
      .leftJoinAndSelect('user.userLanguages', 'languages')
      .leftJoinAndSelect('languages.language', 'language')
      .leftJoinAndSelect('user.category', 'category')
      .leftJoinAndSelect('user.specification', 'specification')
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.educations', 'educations')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('user.projects', 'projects')
      .leftJoinAndSelect('user.certifications', 'certifications')
      .select([
        'user',
        'myCompany',
        'country.name',
        'country.code',
        'languages.level',
        'language.id',
        'language.name',
        'language.code',
        'skills',
        'category.id',
        'category.name',
        'specification.id',
        'specification.name',
        'educations',
        'avatar',
        'projects',
        'certifications',
      ])
      .getOne();
  }

  async getUserWithCompany(id: number) {
    return this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.myCompany', 'myCompany')
      .where('users.id = :id', { id })
      .getOne();
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async updateMe(
    user: UserEntity,
    { firstName, lastName, phoneNumber }: UpdateUserDto,
  ): Promise<UserType> {
    await this.userRepository.update(user.id, {
      firstName,
      lastName,
      phoneNumber,
    });
    return this.getUserFullData(user.id);
  }

  async updateMeAbout(
    user: UserEntity,
    { about, categoryId, specificationId, countryId }: UpdateUserAboutDto,
  ): Promise<UserType> {
    await this.userRepository.update(user.id, {
      about,
      categoryId,
      specificationId,
      countryId,
    });
    return this.getUserFullData(user.id);
  }
}
