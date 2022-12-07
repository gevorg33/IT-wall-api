import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoles } from '../../common/constants/user-roles';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { OfferResponseType } from './types/offer.type';
import { CreateUpdateOfferDto } from './dto/create-update-offer.dto';

@Controller('offers')
@ApiTags('Offers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post('/')
  @Roles(UserRoles.FREELANCER)
  @ApiOperation({ summary: 'Make an offer' })
  @ApiOkResponse({ type: OfferResponseType })
  async create(
    @User() me: UserEntity,
    @Body() data: CreateUpdateOfferDto,
  ): Promise<OfferResponseType> {
    const offer = await this.offerService.create(me, data);
    return { offer };
  }

  @Post('/:id/new-offer')
  @Roles(UserRoles.FREELANCER)
  @ApiOperation({ summary: 'New offer to offer' })
  @ApiOkResponse({ type: OfferResponseType })
  async newOffer(
    @User() me: UserEntity,
    @Param('id') id: number,
    @Body() data: CreateUpdateOfferDto,
  ): Promise<OfferResponseType> {
    const offer = await this.offerService.create(me, data);
    return { offer };
  }

  @Get('/:id')
  @Roles(UserRoles.CUSTOMER, UserRoles.COMPANY)
  @ApiOperation({ summary: 'Get existing offers by job Id' })
  @ApiOkResponse({ type: OfferResponseType })
  async getByJobId(@Param('id') id: number): Promise<any> {
    const offers = await this.offerService.getOffersByJobId(id);
    return { offers };
  }

  @Patch('/:id')
  @Roles(UserRoles.CUSTOMER, UserRoles.COMPANY, UserRoles.FREELANCER)
  @ApiOperation({ summary: 'Update existing offer' })
  @ApiOkResponse({ type: OfferResponseType })
  async update(
    @User() me: UserEntity,
    @Body() data: CreateUpdateOfferDto,
    @Param('id') id: number,
  ): Promise<OfferResponseType> {
    const offer = await this.offerService.update(id, me, data);
    return { offer };
  }

  @Delete('/:id')
  @Roles(UserRoles.CUSTOMER, UserRoles.COMPANY, UserRoles.FREELANCER)
  @ApiOperation({ summary: 'Delete existing offer' })
  @ApiOkResponse({ type: OfferResponseType })
  async delete(
    @User() me: UserEntity,
    @Param('id') id: number,
  ): Promise<OfferResponseType> {
    const offer = await this.offerService.delete(id, me);
    return { offer };
  }
}
