import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  slug: string;
}
