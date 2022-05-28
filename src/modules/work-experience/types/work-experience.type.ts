import { ApiProperty } from '@nestjs/swagger';

export class WorkExperienceType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: 'Armenian National Bank' })
  companyName: string;

  @ApiProperty({ example: 'Information Technologies' })
  industry: string;

  @ApiProperty({ example: 'Frontend Developer' })
  title: string;

  @ApiProperty({ example: 'Yerevan, Armenia' })
  location: string;

  @ApiProperty({ example: 'Date...' })
  startDate: Date;

  @ApiProperty({ example: 'Date...' })
  endDate: Date;

  @ApiProperty({ example: 'Any Description Here...' })
  description: string;
}
