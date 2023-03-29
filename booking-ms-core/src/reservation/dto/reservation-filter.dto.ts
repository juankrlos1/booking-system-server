export class ReservationFilter {
  userId?: number;
  roomId?: number;
  status?: string;
  reservationDate?: Date;
  startTime: number;
  endTime: number;
  attendees?: number;
  page?: number;
  limit?: number;
}
