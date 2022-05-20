import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'regions' })
export class RegionEntity extends AbstractEntity {
  @Column({ length: 120 })
  @ApiProperty({ example: '(GMT-04:00) Lévis' })
  name: string;

  @Column({ length: 100 })
  @ApiProperty({ example: 'America/Blanc-Sablon (GMT-04:00)' })
  label: string;

  @Column({ length: 60 })
  @ApiProperty({ example: 'America/Blanc-Sablon' })
  tzCode: string;

  @Column({ length: 20 })
  @ApiProperty({ example: '-04:00' })
  utc: string;

  ///////////////////////////////// Relations /////////////////////////////////

  // @OneToMany(() => UserLanguageEntity, (userLanguage) => userLanguage.language)
  // userLanguages: UserLanguageEntity[];
}
