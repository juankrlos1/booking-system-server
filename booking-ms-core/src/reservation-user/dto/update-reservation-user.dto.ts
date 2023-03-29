import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationUserDto } from './create-reservation-user.dto';

export class UpdateReservationUserDto extends PartialType(CreateReservationUserDto) {}
