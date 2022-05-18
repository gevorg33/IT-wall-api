import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUserDto } from '../user/dto/login.dto';
import { UserTokenResponseType } from '../user/types/user-token.type';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign Up' })
  @ApiOkResponse({ type: UserTokenResponseType })
  async signup(@Body() data: CreateUserDto): Promise<UserTokenResponseType> {
    return this.authService.signup(data);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Authentication' })
  async login(@Body() data: LoginUserDto): Promise<UserTokenResponseType> {
    return this.authService.login(data);
  }
}
