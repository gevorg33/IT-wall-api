import { ApiProperty } from '@nestjs/swagger';
import { SpecificationType } from './specification.type';

export class SpecificationsListType {
  @ApiProperty({ type: SpecificationType, isArray: true })
  specifications: SpecificationType[];
}
