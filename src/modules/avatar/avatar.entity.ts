import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'avatar' })
export class AvatarEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ example: 23 })
  userId: number;

  @Column()
  @ApiProperty({ example: '-----' })
  key: string;

  @Column()
  @ApiProperty({ example: 'image url... (high quality)' })
  high: string;

  @Column()
  @ApiProperty({ example: 'image url... (normal quality)' })
  medium: string;

  @Column()
  @ApiProperty({ example: 'image url... (low quality)' })
  low: string;

  ///////////////////////////////// Relations /////////////////////////////////

  @JoinColumn({ name: 'userId' })
  @OneToOne(() => UserEntity, (user) => user.avatar)
  user: UserEntity;
}
