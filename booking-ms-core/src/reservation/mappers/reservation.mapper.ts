import { Injectable } from '@nestjs/common';
import { ReservationResponse } from '../interfaces/reservation.response';
import { Reservation } from '../entities/reservation.entity';
import { ReservationUserMapper } from 'src/reservation-user/mappers/reservation-user.mapper';

@Injectable()
export class ReservationMapper {
  constructor(private readonly reservationUserMapper: ReservationUserMapper) {}
  toResponseDto(entity: Reservation): ReservationResponse {
    return {
      reservationId: entity.id,
      userId: entity.userId,
      roomId: entity.roomId,
      startTime: entity.startTime,
      endTime: entity.endTime,
      reservationDate: entity.reservationDate,
      reason: entity.reason,
      attendees: entity.attendees,
      recurring: entity.recurring,
      status: entity.status,
      reservationUsers: this.reservationUserMapper.toResponseDtoList(
        entity.reservationUsers,
      ),
    };
  }

  toResponseDtoList(roomEntities: Reservation[]): ReservationResponse[] {
    return roomEntities.map((entity) => this.toResponseDto(entity));
  }
}
