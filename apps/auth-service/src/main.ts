/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global Middleware - new usage for class based middleware
  // app.use(new LoggerMiddleware().use.bind(new LoggerMiddleware()));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra fields from the request body
      forbidNonWhitelisted: true, // throw an error if extra fields are sent
    })
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
