import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { compare } from 'bcrypt';
import { LoginUserDto } from '../user/dto/login.dto';
import { UserTokenResponseType } from '../user/types/user-token.type';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(data: CreateUserDto): Promise<UserTokenResponseType> {
    const createdUser = await this.userService.createUser(data);
    return this.userService.buildUserResponse(createdUser);
  }

  async login(data: LoginUserDto): Promise<UserTokenResponseType> {
    const user = await this.userService.getByEmail(data.email, true);

    if (!user) {
      throw new BadRequestException('Credentials are not valid');
    }

    const isPasswordCorrect = await compare(data.password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException('Credentials are not valid');
    }

    const userWithCompany = await this.userService.getUserWithCompany(user.id);

    return this.userService.buildUserResponse(userWithCompany);
  }
}
