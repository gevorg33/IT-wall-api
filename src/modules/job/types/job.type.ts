import { ApiProperty } from '@nestjs/swagger';

export class JobType {
  @ApiProperty({ example: 18 })
  id: number;

  @ApiProperty({ example: 23 })
  userId: number;

  @ApiProperty({ example: 'Coca Cola Support Website' })
  title: string;

  @ApiProperty({ example: 'Any Description Here...' })
  description: string;
}

export class JobResponseType {
  @ApiProperty()
  job: JobType;
}
