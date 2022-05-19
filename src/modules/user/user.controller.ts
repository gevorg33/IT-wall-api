import { Body, Controller, Get, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserResponseType } from './types/user-response.type';

@Controller('users')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiOperation({ summary: 'Authentication' })
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Put('/me')
  @ApiOperation({ summary: 'Authentication' })
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseType> {
    user = await this.userService.updateUser(user, updateUserDto);
    return { user };
  }
}
