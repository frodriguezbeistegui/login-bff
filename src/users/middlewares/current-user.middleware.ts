import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.entity';
import { UsersService } from '../users.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.session.current || {};
    if (id) {
      const user = await this.usersService
        .findOne(id)
        .populate('currentSession')
        .exec();

      req.currentUser = user;
    }
    next();
  }
}
