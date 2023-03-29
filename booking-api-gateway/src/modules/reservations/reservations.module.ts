import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { HTTP_CLIENT } from '../../common/constants/tokens';
import { AxiosHttpClientService } from '../../common/client/axios-http-client.service';

@Module({
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    {
      provide: HTTP_CLIENT,
      useClass: AxiosHttpClientService,
    },
  ],
})
export class ReservationsModule {}
