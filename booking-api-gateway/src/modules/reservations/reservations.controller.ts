import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ReservationFilter } from './dto/reservation-filter.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateReservationDto } from './dto/create-reservation.dto';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAllReservations(@Query() filter: ReservationFilter) {
    return this.reservationsService.getReservationsWithFilters(filter);
  }

  @Get('/user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  getReservationsByUser(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.getReservationsByUser(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.createReservationByUser(
      createReservationDto,
    );
  }

  @Post(':id/cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  cancelReservation(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.cancelReservation(id);
  }
}
