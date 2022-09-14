import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
  OneToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { CurrentSession } from './currentSession.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsOptional()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToOne((type) => CurrentSession, (currentSession) => currentSession.user, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  currentSession: CurrentSession;

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
