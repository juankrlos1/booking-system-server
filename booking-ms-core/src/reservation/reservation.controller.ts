import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, ParseIntPipe,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationFilter } from './dto/reservation-filter.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Post(':id/cancel')
  cancelReservation(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.cancelReservation(id);
  }

  @Get()
  findAll(@Query() filter: ReservationFilter) {
    return this.reservationService.findAll(filter);
  }

  @Get('/user/:id')
  getReservationsByUser(@Param('id') id: string) {
    return this.reservationService.findByUser(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
