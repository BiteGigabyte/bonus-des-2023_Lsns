import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  class: string;

  @Column({ type: 'boolean', default: true })
  type: boolean;

  @Column({ type: 'int', nullable: true })
  age: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
