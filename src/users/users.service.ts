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
    currentSession: CurrentSession,
  ) {
    // creates the user in the db with a new currentSession
    const user = this.userRepo.create({
      email,
      password,
      name,
      currentSession,
    });

    return user;
  }

  async sessionCall({ body, action, _id = undefined }) {
    // if the action requires creation date and expiration date will add the corresponding value
    body = (action === 'findOneAndUpdate' || action === 'create') && {
      ...body,
      creationDate: Date.now(),
      expirationDate: Date.now() + 1000 * 60 * 60,
    };

    //  route A) methods with id
    if (_id) {
      return await this.sessionRepo[action]({ _id }, body);
    }
    // route B) methods without id
    return await this.sessionRepo[action](body);
  }

  findOne(id: string) {
    if (!id) {
      throw new NotFoundException('not user found');
    }
    return this.userRepo.findById(id);
  }

  find(email: string) {
    if (email) return this.userRepo.find({ email });
    return this.userRepo.find().populate('currentSession').exec();
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userRepo.findByIdAndUpdate(id, attrs);
    if (!user) {
      throw new NotFoundException('user not found');
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.remove(user);
  }
}
