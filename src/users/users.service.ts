import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/user.entity';
import { CurrentSession } from './models/currentSession.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Action } from 'rxjs/internal/scheduler/Action';
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
    currentSession: CurrentSession,
  ) {
    console.log(currentSession);
    const user = this.userRepo.create({
      email,
      password,
      name,
      currentSession,
    });

    return user;
  }

  // async createCurrentSession(ip: string, provider: string) {
  //   const newSession = await this.sessionRepo.create({
  //     ip,
  //     provider,
  //     creationDate: Date.now(),
  //     expirationDate: Date.now() + 1000 * 60 * 60,
  //   });
  //   return newSession;
  // }

  async sessionCall({ body, action, _id = undefined }) {
    body = action == ('create' || 'findOneAndUpdate') && {
      ...body,
      creationDate: Date.now(),
      expirationDate: Date.now() + 1000 * 60 * 60,
    };

    if (_id) {
      return await this.sessionRepo.findOneAndUpdate({ _id }, body);
      // return await this.sessionRepo[action](id, body);
    }

    return await this.sessionRepo[action](body);
  }

  // async updateSession(id, ip, provider, _id) {
  //   const newSession = await this.sessionRepo.findByIdAndUpdate(_id, {
  //     ip,
  //     provider,
  //     creationDate: Date.now(),
  //     expirationDate: Date.now() + 1000 * 60 * 60,
  //   });
  //   return newSession;
  // }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('not user found');
    }
    return this.userRepo.findById(id);
  }

  find(email: string) {
    if (email) return this.userRepo.find({ email });
    return this.userRepo.find().populate('currentSession').exec();
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
}
