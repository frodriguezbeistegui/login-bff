import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // localhost:3000
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello() {
    return this.appService.getHello();
  }
}
