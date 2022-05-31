import {
  Body,
  Controller,
  Get,
  UseGuards,
  Put,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserResponseType } from './types/user.type';
import { AvatarService } from '../avatar/avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../../utils/file-filters';

@Controller('users')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly avatarService: AvatarService,
  ) {}

  @Get('/me')
  @ApiOperation({ summary: 'Authentication' })
  @ApiOkResponse({ type: UserResponseType })
  async currentUser(@User() me: UserEntity): Promise<UserResponseType> {
    const user = await this.userService.getUserFullData(me.id);
    return { user };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get User Full Data' })
  @ApiOkResponse({ type: UserResponseType })
  async getUserFullData(@Param('id') id: number): Promise<UserResponseType> {
    const user = await this.userService.getUserFullData(id);
    return { user };
  }

  @Post('/me/avatar')
  @ApiOperation({ summary: 'Authentication' })
  @ApiOkResponse({ type: UserResponseType })
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: imageFileFilter,
    }),
  )
  async setAvatar(
    @User() me: UserEntity,
    @UploadedFile() img: Express.Multer.File,
  ): Promise<UserResponseType> {
    const avatar = await this.avatarService.setAvatar(me.id, img);
    console.log(avatar);
    const user = await this.userService.getUserFullData(me.id);
    return { user };
  }

  @Put('/me')
  @ApiOperation({ summary: 'Authentication' })
  @ApiOkResponse({ type: UserResponseType })
  async updateCurrentUser(
    @User() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseType> {
    user = await this.userService.updateUser(user, updateUserDto);
    return { user };
  }
}
