import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
