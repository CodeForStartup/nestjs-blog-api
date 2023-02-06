import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import { Post } from './post.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class File extends BaseEntity {
  @Column()
  fileName: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToOne(() => Post, (post) => post.file)
  post: Post;
}
