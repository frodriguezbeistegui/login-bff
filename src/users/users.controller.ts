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
  // ClassSerializerInterceptor,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serilize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto) //Aplying the middleware to all routes
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  // @UseInterceptors(ClassSerializerInterceptor) // use an interceptor to normalize the response object whithout  excluded fields of our entity
  // @UseInterceptors(new SerializeInterceptor(UserDto)) // Use our own interceptor (works similat to middlewares)
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
