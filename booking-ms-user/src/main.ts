import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { INestMicroservice } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from './user/proto/user';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50052',
        package: protobufPackage,
        protoPath: join(__dirname, '../src/user/proto/user.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap()
  .then(() => console.log('Start user microservice'))
  .catch((error) => console.error('Error: ', error));
