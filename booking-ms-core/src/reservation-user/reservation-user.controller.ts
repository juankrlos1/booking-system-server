import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationUserService } from './reservation-user.service';
import { CreateReservationUserDto } from './dto/create-reservation-user.dto';
import { UpdateReservationUserDto } from './dto/update-reservation-user.dto';

@Controller('reservation-user')
export class ReservationUserController {
  constructor(private readonly reservationUserService: ReservationUserService) {}

  @Post()
  create(@Body() createReservationUserDto: CreateReservationUserDto) {
    return this.reservationUserService.create(createReservationUserDto);
  }

  @Get()
  findAll() {
    return this.reservationUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationUserDto: UpdateReservationUserDto) {
    return this.reservationUserService.update(+id, updateReservationUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationUserService.remove(+id);
  }
}
