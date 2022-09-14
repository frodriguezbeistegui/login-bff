import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class CurrentSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  creationDate: Date;

  @Column()
  expirationDate: Date;

  @Column()
  ip: string;

  @Column()
  provider: string;

  @OneToOne((type) => User, (user) => user.currentSession)
  user: User;
}
