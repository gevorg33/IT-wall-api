import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'skills' })
export class SkillsEntity extends AbstractEntity {
  @Column({ length: 60 })
  @ApiProperty({ example: 'Node.js' })
  name: string;

  ///////////////////////////////// Relations /////////////////////////////////
}
