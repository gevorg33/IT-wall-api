import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity {
  @Column({ length: 60 })
  @ApiProperty({ example: 'Graphic design' })
  name: string;

  ///////////////////////////////// Relations /////////////////////////////////

  @OneToMany(() => UserEntity, (user) => user.category)
  users: UserEntity[];
}
