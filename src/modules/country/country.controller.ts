import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CountriesListType } from './types/countries-list.type';

@Controller('countries')
@ApiTags('Countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Countries List' })
  @ApiOkResponse({ type: CountriesListType })
  async getCountriesList(): Promise<CountriesListType> {
    const countries = await this.countryService.getCountriesList();
    return { countries };
  }
}
