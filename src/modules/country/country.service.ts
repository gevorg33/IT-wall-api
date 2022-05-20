import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './country.entity';
import { CountryType } from './types/country.type';
import timezones from 'timezones-list';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  async getCountriesList(): Promise<CountryType[]> {
    console.log(timezones);
    return this.countryRepository.find({
      order: { name: 'ASC' },
      select: ['id', 'name', 'code'],
    });
  }
}
