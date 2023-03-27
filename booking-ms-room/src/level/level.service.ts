import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Level} from "./entities/level.entity";
import {Repository} from "typeorm";

@Injectable()
export class LevelService {

  constructor(
      @InjectRepository(Level)
      private readonly levelRepository: Repository<Level>,
  ) {
  }
  create(createLevelDto: CreateLevelDto) {
    return 'This action adds a new level';
  }

  findAll() {
    return `This action returns all level`;
  }

  findOne(id: number) {
    return `This action returns a #${id} level`;
  }

  async findOneByBuilding(id: number) {
    return await this.levelRepository.find({ where: { buildingId: id } });
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
