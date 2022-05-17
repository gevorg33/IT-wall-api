import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserResponseInterface } from '../user/types/userResponse.interface';
import { LoginUserDto } from '../user/dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign Up' })
  async signup(@Body() data: CreateUserDto): Promise<UserResponseInterface> {
    return this.authService.signup(data);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Authentication' })
  async login(@Body() data: LoginUserDto): Promise<UserResponseInterface> {
    return this.authService.login(data);
  }
}
