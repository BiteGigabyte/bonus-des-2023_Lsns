import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Animal } from '../animal/animal.entity';
import { Car } from '../car/car.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  userName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => Animal, (entity) => entity.user, { cascade: true })
  animals: Animal[];

  @ManyToMany(() => Car, (entity) => entity.users)
  cars: Car[];
}
