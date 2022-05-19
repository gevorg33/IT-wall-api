import { Column, Entity, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'companies' })
export class CompanyEntity extends AbstractEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  taxNumber: number;

  ///////////////////////////////// Relations /////////////////////////////////

  @OneToOne(() => UserEntity, (user) => user.myCompany, {
    onDelete: 'CASCADE',
  })
  owner: UserEntity;
}
