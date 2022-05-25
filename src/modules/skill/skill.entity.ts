import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'skills' })
export class SkillEntity extends AbstractEntity {
  @Column({ length: 60 })
  @ApiProperty({ example: 'Node.js' })
  name: string;

  ///////////////////////////////// Relations /////////////////////////////////

  @ManyToMany(() => UserEntity, (user) => user.skills)
  users: UserEntity[];
}
