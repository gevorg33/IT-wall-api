import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'specifications' })
export class SpecificationEntity extends AbstractEntity {
  @Column({ length: 120 })
  @ApiProperty({ example: 'Graphic designer' })
  name: string;

  ///////////////////////////////// Relations /////////////////////////////////

  @OneToMany(() => UserEntity, (user) => user.specification)
  users: UserEntity[];
}
