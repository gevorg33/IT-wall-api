import { ApiProperty } from '@nestjs/swagger';

export class EducationType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: 'National University Of Armenia' })
  institution: string;

  @ApiProperty({ example: `Bachelor's` })
  degree: string;

  @ApiProperty({ example: 'Information Technologies' })
  fieldOfStudy: string;

  @ApiProperty({ example: 'Date...' })
  startDate: Date;

  @ApiProperty({ example: 'Date...' })
  endDate: Date;

  @ApiProperty({ example: 'Any Description Here...' })
  description: string;
}
