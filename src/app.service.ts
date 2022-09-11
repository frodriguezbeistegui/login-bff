import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    console.log('hello');
    return 'Hello World!';
  }
}
