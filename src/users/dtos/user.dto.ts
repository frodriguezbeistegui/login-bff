import { Expose } from 'class-transformer';
import { CurrentSession } from '../entities/currentSession.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  ip: string;

  @Expose()
  provider: string;

  @Expose()
  currentSession: CurrentSession;
}
