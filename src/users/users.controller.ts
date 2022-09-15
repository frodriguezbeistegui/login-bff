import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  NotFoundException,
  Session,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { User } from './models/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { SignInUserDto } from './dtos/signin-user.dto';

@Controller('auth')
@Serialize(UserDto) //Applying the middleware to all routes
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    if (!user) {
      return null;
    }

    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.current = null;
  }

  @Post('/signup')
  async createUser(
    @Body() { email, password, name, ip, provider }: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signUp(
      email,
      password,
      name,
      ip,
      provider,
    );
    session.current = { id: user.id, currentSession: user.currentSession };
    return user;
  }

  @Put('/signin')
  async signin(
    @Body() { email, password, ip, provider }: SignInUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signIn(email, password, ip, provider);
    console.log(user.currentSession);
    session.current = { id: user.id, currentSession: user.currentSession };
    return user;
  }

  // @UseInterceptors(ClassSerializerInterceptor) // use an interceptor to normalize the response object without  excluded fields of our entity
  // @UseInterceptors(new SerializeInterceptor(UserDto)) // Use our own interceptor (works similar to middleware)
  // @Serialize(UserDto) // re-factored the code to not import so many functions
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`Not user found with an id of ${id}`);
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }
}
