import { Module } from '@nestjs/common';
import { ReservationUserService } from './reservation-user.service';
import { ReservationUserController } from './reservation-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationUser } from './entities/reservation-user.entity';
import { ReservationUserMapper } from './mappers/reservation-user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationUser])],
  controllers: [ReservationUserController],
  providers: [ReservationUserService, ReservationUserMapper],
  exports: [ReservationUserMapper],
})
export class ReservationUserModule {}
