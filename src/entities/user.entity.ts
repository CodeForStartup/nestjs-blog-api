import * as bcrypt from 'bcryptjs';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';
import { AuthProvidersEnum } from '../shared/constant/index';
import { PostItem } from './postItem.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, unique: true })
  @MinLength(6)
  @MaxLength(50)
  username: string;

  @Column({ nullable: true, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(): Promise<void> {
    const salt = await bcrypt.genSaltSync(10);
    this.password = bcrypt.hash(this.password, salt);
  }

  @Index()
  @Column({ nullable: true })
  socialId: string | null;

  @Column({
    type: 'enum',
    enum: AuthProvidersEnum,
    default: AuthProvidersEnum.email,
  })
  provider: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @OneToMany(() => PostItem, (postItem) => postItem.user, { cascade: true })
  postItems: PostItem[];
}
