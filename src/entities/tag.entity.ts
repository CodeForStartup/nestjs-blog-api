import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Post } from './post.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
