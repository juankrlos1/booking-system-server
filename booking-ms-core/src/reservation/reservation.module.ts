import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ConfigModule } from '@nestjs/config';
import { HTTP_CLIENT } from '../common/constants/tokens';
import { AxiosHttpClientService } from '../common/client/axios-http-client.service';
import { ReservationMapper } from './mappers/reservation.mapper';
import { ReservationUserMapper } from '../reservation-user/mappers/reservation-user.mapper';
import { RoomService } from '../room/room.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationMapper,
    ReservationUserMapper,
    RoomService,
    {
      provide: HTTP_CLIENT,
      useClass: AxiosHttpClientService,
    },
  ],
})
export class ReservationModule {}
