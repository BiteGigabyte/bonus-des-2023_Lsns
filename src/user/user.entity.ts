import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Animal } from '../animal/animal.entity';

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

  @OneToMany(() => Animal, (animal) => animal.user, { cascade: true })
  animals: Animal[];
}
