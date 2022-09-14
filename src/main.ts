import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 8080

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(PORT);
}
console.log(`app listening on port: ${PORT}`)
bootstrap();
