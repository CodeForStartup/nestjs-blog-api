import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Forgot extends BaseEntity {
  @Column()
  @Index()
  hash: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  expiresIn!: Date;

  @ManyToOne(() => User, (user) => user.forgets)
  user: User;
}
