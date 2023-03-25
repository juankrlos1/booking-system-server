import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import * as process from 'process';

const logger = new Logger('BOOKING_MAIN_APP');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('Booking System Api Gateway')
    .setDescription(
      'Microservices manager, written in NestJS, connecting microservices with gRpc',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap()
  .then(() => logger.log('Start booking api gateway'))
  .catch((error) => logger.error('Error: ', error));
