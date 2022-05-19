import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { compare } from 'bcrypt';
import { LoginUserDto } from '../user/dto/login.dto';
import { UserTokenResponseType } from '../user/types/user-token.type';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: CreateUserDto): Promise<UserTokenResponseType> {
    const createdUser = await this.userService.createUser(data);

    return this.getUserTokenResponse(createdUser);
  }

  async login(data: LoginUserDto): Promise<UserTokenResponseType> {
    const user = await this.validateUser(data.email, data.password);
    const userWithCompany = await this.userService.getUserWithCompany(user.id);

    return this.getUserTokenResponse(userWithCompany);
  }

  async getUserTokenResponse(user: UserEntity): Promise<UserTokenResponseType> {
    user['access_token'] = this.generateJwt(user);
    return { user };
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getByEmail(email, true);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return user;
  }

  generateJwt(user: UserEntity): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }
}
