import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { JoinTable } from 'typeorm';
import { BaseEntity } from '../base.entity/base.entity';

@Entity({ name: 'companies' })
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  taxNumber: number;

  // createdUserId connect relation to user table
  @Column()
  cratedUserId: number;

  // @BelongsTo(() => Company)
  // company: Company;
  //
  // @BelongsToMany(() => Role, () => UserRole)
  // roles: Role[];

  // @OneToMany(() => ArticleEntity, (article) => article.author)
  // articles: ArticleEntity[];
  //
  // @ManyToMany(() => ArticleEntity)
  // @JoinTable()
  // favorites: ArticleEntity[];
}
