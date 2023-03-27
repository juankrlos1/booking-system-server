import { Injectable } from '@nestjs/common';
import { ReservationUser } from '../entities/reservation-user.entity';
import { ReservationUserResponse } from '../interfaces/reservation-user.response';

@Injectable()
export class ReservationUserMapper {
  toResponseDto(entity: ReservationUser): ReservationUserResponse {
    return {
      userId: entity.userId,
    };
  }

  toResponseDtoList(
    roomEntities: ReservationUser[],
  ): ReservationUserResponse[] {
    if (!Array.isArray(roomEntities) || roomEntities.length === 0) return [];
    return roomEntities.map((entity) => this.toResponseDto(entity));
  }
}
