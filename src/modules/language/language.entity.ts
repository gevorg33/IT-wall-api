import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserLanguageEntity } from '../user-language/user-language.entity';

@Entity({ name: 'languages' })
export class LanguageEntity extends AbstractEntity {
  @Column({ length: 60 })
  @ApiProperty({ example: 'Armenian' })
  name: string;

  @Column({ length: 2 })
  @ApiProperty({ example: 'hy' })
  code: string;

  ///////////////////////////////// Relations /////////////////////////////////

  // @ManyToMany(() => UserEntity, (user) => user.languages)
  // users: UserEntity[];

  @OneToMany(() => UserLanguageEntity, (userLanguage) => userLanguage.language)
  userLanguages: UserLanguageEntity[];
}
