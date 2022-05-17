import { Column, Entity, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'companies' })
export class CompanyEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  taxNumber: number;

  ///////////////////////////////// Relations /////////////////////////////////

  @OneToOne(() => UserEntity, (user) => user.myCompany, {
    onDelete: 'CASCADE',
  })
  owner: UserEntity;
}
