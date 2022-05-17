import { Body, Controller, Get, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseInterface } from './types/userResponse.interface';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiOperation({ summary: 'Authentication' })
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('/me')
  @ApiOperation({ summary: 'Authentication' })
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    user = await this.userService.updateUser(user, updateUserDto);
    return this.userService.buildUserResponse(user);
  }
}
