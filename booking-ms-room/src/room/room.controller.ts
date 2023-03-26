import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomFilter } from './dto/room-filter.dto';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  getAllRoomsWithFilters(@Query() filter: RoomFilter) {
    return this.roomService.findAll(filter);
  }

  @Get(':id')
  getRoomById(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.findById(id);
  }

  @Get('/level/:level')
  getRoomsByLevel(@Param('level', ParseIntPipe) level: number) {
    return this.roomService.findByLevel(level);
  }

  @Get('/status/active')
  getRoomsByStatus() {
    return this.roomService.findByStatus();
  }

  @Post()
  createRoom(@Body() room: CreateRoomDto) {
    return this.roomService.createRoom(room);
  }
}
