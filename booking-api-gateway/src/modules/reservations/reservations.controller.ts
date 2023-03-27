import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
}
