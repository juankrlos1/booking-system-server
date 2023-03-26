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
  ValidationPipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoomFilter } from './dto/room-filter.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAllRoomsWithFilters(@Query() filter: RoomFilter) {
    return this.roomsService.findAllRoomsFilters(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getRoomsById(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findRoomById(id);
  }

  @Get('/level/:level')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getRoomsByLevel(@Param('level', ParseIntPipe) level: number) {
    return this.roomsService.findRoomByLevel(level);
  }

  @Get('/status/active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  getRoomsByStatus() {
    return this.roomsService.findRoomByStatus();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createRoom(@Body(new ValidationPipe()) createRoomDto: CreateRoomDto) {
    return await this.roomsService.createRoom(createRoomDto);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateRoom(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateRoomDto: UpdateRoomDto,
  ) {
    return await this.roomsService.updateRoom(id, updateRoomDto);
  }
}
