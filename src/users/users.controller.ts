import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    // when user do have a valid session cookie gets the info from there using AuthGuard
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    // set the auth cookie (session) to null
    session.current = null;
  }

  @Post('/signup')
  async createUser(
    @Body() { email, password, name, ip, provider }: CreateUserDto,
    @Session() session: any,
  ) {
    // Creates an user and a currentSession for it
    const user = await this.authService.signUp(
      email,
      password,
      name,
      ip,
      provider,
    );
    // Updates the auth cookie with current user and session
    session.current = { id: user.id, currentSession: user.currentSession };

    return user;
  }

  @Put('/signin')
  async signin(
    @Body() { email, password, ip, provider }: SignInUserDto,
    @Session() session: any,
  ) {
    // Check user credentials and return user with a new currentSession
    const user = await this.authService.signIn(email, password, ip, provider);
    // updates auth cookie
    session.current = { id: user.id, currentSession: user.currentSession };

    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
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
    return this.usersService.remove(id);
  }

  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
