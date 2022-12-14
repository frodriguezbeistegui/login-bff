import { IsEmail, IsIP, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsIP()
  ip: string;

  @IsString()
  provider: string;
}
