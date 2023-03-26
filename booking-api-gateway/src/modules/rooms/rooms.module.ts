import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { HTTP_CLIENT } from '../../common/constants/tokens';
import { AxiosHttpClientService } from '../../common/client/axios-http-client.service';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    {
      provide: HTTP_CLIENT,
      useClass: AxiosHttpClientService,
    },
  ],
})
export class RoomsModule {}
