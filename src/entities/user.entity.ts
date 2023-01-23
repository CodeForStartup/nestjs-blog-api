import * as bcrypt from 'bcryptjs';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';
import { AuthProvidersEnum } from './../common/constant/index';

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

  @Column()
  phoneNumber: string;

  @Column()
  birthDate: Date;

  @Column({ nullable: true })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(): Promise<void> {
    const salt = await bcrypt.getSalt();
    this.password = bcrypt.hashPassword(this.password, salt);
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
}
