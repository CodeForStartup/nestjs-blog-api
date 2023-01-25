import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { Tag } from './tag.entity';
import { Post } from './post.entity';

@Entity()
export class PostItem extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Post, (post) => post.postItems)
  post: Post;
}
