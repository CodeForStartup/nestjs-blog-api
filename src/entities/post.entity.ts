import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { Tag } from './tag.entity';
import { PostItem } from './postItem.entity';
import { File } from './file.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @OneToOne(() => File, (file) => file.post)
  file: File;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => PostItem, (postItem) => postItem.post)
  postItems: Post[];
}
