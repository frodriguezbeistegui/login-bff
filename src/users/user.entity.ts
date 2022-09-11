import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id ' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id ' + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id' + this.id);
  }
}
