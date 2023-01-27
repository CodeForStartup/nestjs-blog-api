import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
// import { BaseEntity } from './base.entity';

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToOne(() => Post, (post) => post.file)
  post: Post;
}
