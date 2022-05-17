import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto/create.company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyEntity> {
    const newCompany = new CompanyEntity();
    Object.assign(newCompany, createCompanyDto);
    return this.companyRepository.save(newCompany);
  }

  findById(id: number): Promise<CompanyEntity> {
    return this.companyRepository.findOne(id);
  }

  // async updateCompany(
  //   companyId: number,
  //   updateCompanyDto: UpdateCompanyDto,
  // ): Promise<UserEntity> {
  //   const company = await this.findById(companyId);
  //   Object.assign(company, updateCompanyDto);
  //   return this.companyRepository.save(company);
  // }
}
