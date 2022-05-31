import {
  Body,
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from './user.entity';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserResponseType } from './types/user.type';
import { AvatarService } from '../avatar/avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarSize, imageFileFilter } from '../../utils/file-validation';
import { AvatarDto } from '../avatar/dto/avatar.dto';
import { UpdateUserAboutDto } from './dto/update-user-about.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly avatarService: AvatarService,
  ) {}

  @Get('/me')
  @ApiOperation({ summary: 'Get Me' })
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
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Add Avatar' })
  @ApiOkResponse({ type: UserResponseType })
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: imageFileFilter,
      limits: { fileSize: AvatarSize },
    }),
  )
  @ApiBody({ type: AvatarDto })
  async setAvatar(
    @User() me: UserEntity,
    @UploadedFile() img: Express.Multer.File,
  ): Promise<UserResponseType> {
    await this.avatarService.addAvatar(me.id, img);
    const user = await this.userService.getUserFullData(me.id);
    return { user };
  }

  @Delete('/me/avatar')
  @ApiOperation({ summary: 'Delete Avatar' })
  @ApiOkResponse({ type: UserResponseType })
  async deleteAvatar(@User() me: UserEntity): Promise<UserResponseType> {
    await this.avatarService.deleteAvatar(me.id);
    const user = await this.userService.getUserFullData(me.id);
    return { user };
  }

  @Patch('/me/about')
  @ApiOperation({ summary: 'Update Me About Case' })
  @ApiOkResponse({ type: UserResponseType })
  async updateMeAbout(
    @User() me: UserEntity,
    @Body() data: UpdateUserAboutDto,
  ): Promise<UserResponseType> {
    const user = await this.userService.updateMeAbout(me, data);
    return { user };
  }

  @Patch('/me')
  @ApiOperation({ summary: 'Update Me' })
  @ApiOkResponse({ type: UserResponseType })
  async updateMe(
    @User() me: UserEntity,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseType> {
    const user = await this.userService.updateMe(me, data);
    return { user };
  }
}
