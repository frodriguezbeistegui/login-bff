import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/user.entity';
import { CurrentSession } from './models/currentSession.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userRepo: Model<User>,
    @InjectModel(CurrentSession.name)
    private readonly sessionRepo: Model<CurrentSession>,
  ) {}
  async create(
    email: string,
    password: string,
    name: string,
    ip: string,
    provider: string,
  ) {
    const currentSession = await this.createCurrentSession(ip, provider);
    // console.log(currentSession);
    const user = this.userRepo.create({
      email,
      password,
      name,
      currentSession,
    });

    console.log(user);
    return user;
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('not user found');
    }
    return this.userRepo.findById(id);
  }

  find(email: string) {
    return this.userRepo.find({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.userRepo.findByIdAndUpdate(id, attrs);
    if (!user) {
      throw new NotFoundException('user not found');
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.remove(user);
  }

  createCurrentSession(ip: string, provider: string) {
    return this.sessionRepo.create({
      ip,
      provider,
    });
  }
}
