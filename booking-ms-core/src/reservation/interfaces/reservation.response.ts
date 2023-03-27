import { ReservationUserResponse } from '../../reservation-user/interfaces/reservation-user.response';

export interface ReservationResponse {
  reservationId: number;
  userId: number;
  roomId: number;
  roomName?: string;
  startTime: Date;
  endTime: Date;
  reservationDate: Date;
  reason: string;
  attendees: number;
  recurring: boolean;
  status: string;
  reservationUsers?: ReservationUserResponse[];
}
