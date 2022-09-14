import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './models/user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CurrentSession,
  CurrentSessionSchema,
} from './models/currentSession.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // schema.pre<User>('save', async function () {
          //   this.populate({
          //     path: 'currentSession',
          //     select: '-_id',
          //   });
          // });
          return schema;
        },
      },
      {
        name: CurrentSession.name,
        useFactory: () => {
          const schema = CurrentSessionSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
