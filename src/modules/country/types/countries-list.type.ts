import { ApiProperty } from '@nestjs/swagger';
import { CountryType } from './country.type';

export class CountriesListType {
  @ApiProperty({ type: CountryType, isArray: true })
  countries: CountryType[];
}
