import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomMapper } from './mappers/room.mapper';
import { LevelMapper } from '../level/mappers/level.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService, RoomMapper, LevelMapper],
  exports: [RoomMapper],
})
export class RoomModule {}
