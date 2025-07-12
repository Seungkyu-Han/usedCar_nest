import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {ExtractUserInterceptor} from "./users/interceptors/extract-user.interceptor";

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
  );
  app.use(cookieSession({
    keys:['seungkyu']
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
