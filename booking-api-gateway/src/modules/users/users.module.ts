import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { HTTP_CLIENT } from '../../common/constants/tokens';
import { AxiosHttpClientService } from '../../common/client/axios-http-client.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: HTTP_CLIENT,
      useClass: AxiosHttpClientService,
    },
  ],
})
export class UsersModule {}
