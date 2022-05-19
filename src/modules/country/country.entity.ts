import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'countries' })
export class CountryEntity extends AbstractEntity {
  @Column({ length: 60 })
  @ApiProperty({ example: 'Armenia' })
  name: string;

  @Column({ length: 2 })
  @ApiProperty({ example: 'AM' })
  code: string;

  ///////////////////////////////// Relations /////////////////////////////////

  @OneToMany(() => UserEntity, (user) => user.country)
  users: UserEntity[];
}
