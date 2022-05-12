import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';

@Controller('companies')
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
}
