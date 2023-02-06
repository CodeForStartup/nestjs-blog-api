import * as bcrypt from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Refresh extends BaseEntity {
  @Column()
  refreshToken: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(): Promise<void> {
    const salt = await bcrypt.genSaltSync(10);
    this.refreshToken = await bcrypt.hash(this.refreshToken, salt);
  }

  @Column()
  isActive: boolean;

  @Column()
  expireIn: Date;

  @ManyToOne(() => User, (user) => user.refreshes)
  user: User;
}
