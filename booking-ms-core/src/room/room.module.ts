import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { ConfigModule } from '@nestjs/config';
import { HTTP_CLIENT } from '../common/constants/tokens';
import { AxiosHttpClientService } from '../common/client/axios-http-client.service';

@Module({
  imports: [ConfigModule],
  providers: [
    RoomService,
    {
      provide: HTTP_CLIENT,
      useClass: AxiosHttpClientService,
    },
  ],
  exports: [RoomService],
})
export class RoomModule {}
