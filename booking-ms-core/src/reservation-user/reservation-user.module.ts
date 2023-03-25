import { Module } from '@nestjs/common';
import { ReservationUserService } from './reservation-user.service';
import { ReservationUserController } from './reservation-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationUser } from './entities/reservation-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationUser])],
  controllers: [ReservationUserController],
  providers: [ReservationUserService],
})
export class ReservationUserModule {}
