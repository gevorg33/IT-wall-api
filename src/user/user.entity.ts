import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { JoinTable } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: number;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  // connect to roles table with roleID
  // @BelongsToMany(() => Role, () => UserRole)
  // roles: Role[];

  // @BelongsTo(() => Company)
  // company: Company;
  //

  // @OneToMany(() => ArticleEntity, (article) => article.author)
  // articles: ArticleEntity[];
  //
  // @ManyToMany(() => ArticleEntity)
  // @JoinTable()
  // favorites: ArticleEntity[];
}
