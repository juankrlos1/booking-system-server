import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomFilter } from './dto/room-filter.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll(@Query() filter: RoomFilter) {
    return this.roomService.findAll(filter);
  }

  @Get('/level/:level')
  findByLevel(@Param('level', ParseIntPipe) level: number) {
    return this.roomService.findByLevel(level);
  }
}
