import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const area = this.areaRepository.create(createAreaDto);
    return await this.areaRepository.save(area);
  }

  async findAll(): Promise<Area[]> {
    return await this.areaRepository.find({ relations: ['department'] });
  }

  async findOne(id: number): Promise<Area> {
    return await this.areaRepository.findOne({
      where: { id: id },
      relations: ['department'],
    });
  }

  async update(id: number, updateAreaDto: UpdateAreaDto): Promise<Area> {
    await this.areaRepository.update(id, updateAreaDto);
    return await this.areaRepository.findOne({
      where: { id: id },
      relations: ['department'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.areaRepository.delete(id);
  }
}
