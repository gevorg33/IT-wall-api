import { Controller, Get } from '@nestjs/common';
import { SpecificationService } from './specification.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SpecificationsListType } from './types/specifications-list.type';

@Controller('specifications')
@ApiTags('Specifications')
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Specifications List' })
  @ApiOkResponse({ type: SpecificationsListType })
  async getSpecificationsList(): Promise<SpecificationsListType> {
    const specifications =
      await this.specificationService.getSpecificationsList();
    return { specifications };
  }
}
