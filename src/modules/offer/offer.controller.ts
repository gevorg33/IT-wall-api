import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { OfferResponseType, OffersResponseType } from './types/offer.type';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { UpdateOfferStatusDto } from './dto/update-offer-status.dto';
import { GetOffersDto } from './dto/get-offers.dto';

@Controller('offers')
@ApiTags('Offers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post('/')
  @ApiOperation({ summary: 'Make an offer' })
  @ApiOkResponse({ type: OfferResponseType })
  async create(
    @User() me: UserEntity,
    @Body() data: CreateOfferDto,
  ): Promise<OfferResponseType> {
    const offer = await this.offerService.create(me, data);
    return { offer };
  }

  @Post('/:id')
  @ApiOperation({ summary: 'New offer to offer' })
  @ApiOkResponse({ type: OfferResponseType })
  async newOffer(
    @User() me: UserEntity,
    @Param('id') id: number,
    @Body() data: CreateOfferDto,
  ): Promise<OfferResponseType> {
    const offer = await this.offerService.newOffer(me, id, data);
    return { offer };
  }

  @Get('/')
  @ApiOperation({ summary: 'Get existing offers by job Id' })
  @ApiOkResponse({ type: OffersResponseType })
  async getByJobId(
    @User() me: UserEntity,
    @Query() qData: GetOffersDto,
  ): Promise<OffersResponseType> {
    const offers = await this.offerService.getOffersByJobId(me, qData);
    return { offers };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get existing offer' })
  @ApiOkResponse({ type: OfferResponseType })
  async getOfferData(
    @User() me: UserEntity,
    @Param('id') id: number,
  ): Promise<OfferResponseType> {
    const offer = await this.offerService.getOfferData(me, id);
    return { offer };
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update existing offer' })
  @ApiOkResponse({ type: OfferResponseType })
  async update(
    @User() me: UserEntity,
    @Body() data: UpdateOfferDto,
    @Param('id') id: number,
  ): Promise<OfferResponseType> {
    const offer = await this.offerService.update(id, me, data);
    return { offer };
  }

  @Patch('/:id/status')
  @ApiOperation({ summary: 'Accept or decline offer status' })
  @ApiOkResponse({ type: OfferResponseType })
  async updateStatus(
    @User() me: UserEntity,
    @Body() data: UpdateOfferStatusDto,
    @Param('id') id: number,
  ): Promise<OfferResponseType> {
    const offer = await this.offerService.updateStatus(id, me, data);
    return { offer };
  }

  @Delete('/:id')
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
