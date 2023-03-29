import { Injectable } from '@nestjs/common';
import { CreateReservationUserDto } from './dto/create-reservation-user.dto';
import { UpdateReservationUserDto } from './dto/update-reservation-user.dto';

@Injectable()
export class ReservationUserService {
  create(createReservationUserDto: CreateReservationUserDto) {
    return 'This action adds a new reservationUser';
  }

  findAll() {
    return `This action returns all reservationUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservationUser`;
  }

  update(id: number, updateReservationUserDto: UpdateReservationUserDto) {
    return `This action updates a #${id} reservationUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservationUser`;
  }
}
