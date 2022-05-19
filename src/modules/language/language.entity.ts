import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'languages' })
export class LanguageEntity extends AbstractEntity {
  @Column({ length: 60 })
  @ApiProperty({ example: 'Armenian' })
  name: string;

  @Column({ length: 2 })
  @ApiProperty({ example: 'hy' })
  code: string;

  ///////////////////////////////// Relations /////////////////////////////////

  @ManyToMany(() => UserEntity)
  users: UserEntity[];
}
