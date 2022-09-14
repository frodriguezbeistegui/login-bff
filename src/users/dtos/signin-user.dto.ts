import { Expose } from 'class-transformer';
import { IsEmail, IsIP, IsString } from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
  @IsIP()
  ip: string;

  @IsString()
  provider: string;
}
