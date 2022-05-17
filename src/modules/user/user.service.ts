import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { UserResponseInterface } from './types/userResponse.interface';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserRoles } from '../../common/constants/role/user-roles';
import { RolesEntity } from '../roles/roles.entity';
import { CompanyEntity } from '../company/company.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
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

  async getByEmail(email: string, getPassword = false) {
    const select: (keyof UserEntity)[] = [
      'id',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
    ];
    getPassword && select.push('password');
    return this.userRepository.findOne({
      where: { email },
      select: select,
    });
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

  async updateUser(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
