import { Injectable } from '@nestjs/common';
import { Room } from '../entities/room.entity';
import { RoomResponse } from '../interfaces/room-response.interface';
import { LevelMapper } from '../../level/mappers/level.mapper';
import { CreateRoomDto } from '../dto/create-room.dto';

@Injectable()
export class RoomMapper {
  constructor(private readonly levelMapper: LevelMapper) {}

  toResponseDto(roomEntity: Room): RoomResponse {
    return {
      roomId: roomEntity.id,
      name: roomEntity.name,
      levelId: roomEntity.levelId,
      capacity: roomEntity.capacity,
      photoUrl: roomEntity.photoUrl,
      status: roomEntity.status,
      levelName: roomEntity.level.name,
    };
  }

  toResponseDtoList(roomEntities: Room[]): RoomResponse[] {
    return roomEntities.map((roomEntity) => this.toResponseDto(roomEntity));
  }

  toRequestEntity(createRoomDto: CreateRoomDto): Room {
    return {
      name: createRoomDto.name,
      levelId: createRoomDto.levelId,
      capacity: createRoomDto.capacity,
      photoUrl: createRoomDto.photoUrl,
      status: createRoomDto.status,
    };
  }
}
