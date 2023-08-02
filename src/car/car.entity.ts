import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { CarClassEnum } from './model/enum/car-class.enum';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  producer: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', nullable: false })
  model: string;

  @Column({ enum: CarClassEnum })
  class: CarClassEnum;

  @ManyToMany(() => User, (entity) => entity.cars)
  @JoinTable()
  users: User[];
}
