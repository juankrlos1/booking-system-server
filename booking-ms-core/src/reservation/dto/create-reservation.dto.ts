import {
  IsDateString,
  IsBoolean,
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from './user.dto';
import { RoomDto } from './room.dto';

export enum ReservationStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
}

export class CreateReservationDto {
  @Type(() => UserDto)
  user: UserDto;

  @Type(() => RoomDto)
  room: RoomDto;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @IsDateString()
  reservationDate: Date;

  @IsString()
  reason: string;

  @IsInt()
  attendees: number;

  @IsBoolean()
  recurring: boolean;

  @IsEnum(ReservationStatus)
  status: ReservationStatus = ReservationStatus.PENDING;

  @IsDateString()
  createdAt: Date;

  @IsString()
  createdBy: string;

  @IsDateString()
  updatedAt: Date;

  @IsString()
  updatedBy: string;
}
