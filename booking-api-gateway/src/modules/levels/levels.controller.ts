import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Levels')
@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get('/building/:id')
  getLevelsByBuilding(@Param('id', ParseIntPipe) id: number) {
    return this.levelsService.findLevelsByBuilding(id);
  }
}
