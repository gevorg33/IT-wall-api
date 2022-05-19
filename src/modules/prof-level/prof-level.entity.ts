import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'prof_levels' })
export class ProfLevelEntity extends AbstractEntity {
  @Column({ length: 60 })
  @ApiProperty({ example: 'Elementary' })
  name: string;

  ///////////////////////////////// Relations /////////////////////////////////

  @ManyToMany(() => UserEntity)
  users: UserEntity[];
}
