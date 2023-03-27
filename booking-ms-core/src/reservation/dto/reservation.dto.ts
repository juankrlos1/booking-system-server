import { UserDto } from './user.dto';
import { RoomDto } from './room.dto';

export class ReservationDto {
  id: number;
  user: UserDto;
  room: RoomDto;
  startTime: Date;
  endTime: Date;
  reservationDate: Date;
  reason: string;
  attendees: number;
  recurring: boolean;
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
