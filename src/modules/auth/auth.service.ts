import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUserDto } from '../user/dto/login.dto';
import { UserTokenResponseType } from '../user/types/user-token.type';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '../user/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: CreateUserDto): Promise<UserTokenResponseType> {
    const createdUser = await this.userService.createUser(data);
    const user = await this.userService.getUserFullData(createdUser.id);

    return this.getUserTokenResponse(user);
  }

  async login(data: LoginUserDto): Promise<UserTokenResponseType> {
    const user = await this.validateUser(data.email, data.password);
    const userWithCompany = await this.userService.getUserWithCompany(user.id);

    return this.getUserTokenResponse(userWithCompany);
  }

  async getUserTokenResponse(
    user: UserEntity | UserType,
  ): Promise<UserTokenResponseType> {
    return {
      user: {
        ...user,
        accessToken: (user['accessToken'] = this.generateJwt(user)),
      },
    };
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getByEmail(email, true);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return user;
  }

  generateJwt(user: UserEntity | UserType): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }
}
