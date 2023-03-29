import { Injectable } from '@nestjs/common';
import { Level } from '../entities/level.entity';
import { LevelResponse } from '../interfaces/level-response.interface';

@Injectable()
export class LevelMapper {
  toResponseDto(level: Level): LevelResponse {
    return {
      levelId: level.id,
      name: level.name,
    };
  }

  toResponseDtoList(levels: Level[]): LevelResponse[] {
    return levels.map((levelEntity) => this.toResponseDto(levelEntity));
  }
}
