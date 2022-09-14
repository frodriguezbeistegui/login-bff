import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CurrentSession } from './entities/currentSession.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(CurrentSession)
    private sessionRepo: Repository<CurrentSession>,
  ) {}
  async create(
    email: string,
    password: string,
    name: string,
    ip: string,
    provider: string,
  ) {
    const currentSession = this.createCurrentSession(ip, provider);
    // console.log(currentSession);
    const user = this.repo.create({
      email,
      password,
      name,
    });

    currentSession.user = user;
    user.currentSession = currentSession;

    await this.sessionRepo.save(currentSession);
    const newUser = await this.repo.save(user);
    // console.log(newUser, currentSession)
    console.log(newUser);
    return newUser;
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('not user found');
    }
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }

  createCurrentSession(ip: string, provider: string) {
    return this.sessionRepo.create({
      creationDate: Date.now(),
      expirationDate: Date.now() + 1200000, // 1h
      ip,
      provider,
    });
  }
}
