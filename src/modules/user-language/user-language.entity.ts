import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LanguageLevels } from '../../common/constants/prof-levels';
import { UserEntity } from '../user/user.entity';
import { LanguageEntity } from '../language/language.entity';

@Entity({ name: 'users_languages' })
export class UserLanguageEntity extends AbstractEntity {
  @Column({
    type: 'enum',
    enum: LanguageLevels,
    default: LanguageLevels.ELEMENTARY,
  })
  @ApiProperty()
  level: LanguageLevels;

  @Column()
  @ApiProperty()
  userId: number;

  @Column()
  @ApiProperty()
  languageId: number;

  ///////////////////////////////// Relations /////////////////////////////////

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.userLanguages)
  user: UserEntity;

  @JoinColumn({ name: 'languageId' })
  @ManyToOne(() => LanguageEntity, (language) => language.userLanguages)
  language: LanguageEntity;
}
