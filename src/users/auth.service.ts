import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(
    email: string,
    password: string,
    name: string,
    ip: string,
    provider: string,
  ) {
    // See if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    // hash the users password
    // generate a salt
    const salt = randomBytes(8).toString('hex');
    //hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join the hash and the salt together
    const result = salt + '.' + hash.toString('hex');

    //Create a newSession
    const newSession = await this.usersService.sessionCall({
      body: { ip, provider },
      action: 'create',
    });

    // create a new user and save it
    const user = await this.usersService.create(
      email,
      result,
      name,
      newSession,
    );
    // return the user
    return user;
  }

  async signIn(email: string, password: string, ip: string, provider: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }

    // Update user session and adding it to user's object
    user.currentSession = await this.usersService.sessionCall({
      _id: user.currentSession._id,
      action: 'findOneAndUpdate',
      body: { provider, ip },
    });

    return user;
  }
}
