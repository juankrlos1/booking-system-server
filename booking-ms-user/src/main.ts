import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as process from 'process';
import { AllExceptionFilter } from './common/filters/http-exception.filter';

const logger = new Logger('BOOKING_USER_MAIN_APP');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionFilter());
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT || 3002);
}
bootstrap()
  .then(() => logger.log('Start user microservice'))
  .catch((error) => logger.error('Error: ', error));
