import { Expose, Transform } from 'class-transformer';
import { CurrentSession } from '../models/currentSession.entity';

export class UserDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  ip: string;

  @Expose()
  provider: string;

  @Expose()
  @Transform(({ obj }) => obj.currentSession)
  currentSession: CurrentSession;

  @Expose()
  id: string;
}
