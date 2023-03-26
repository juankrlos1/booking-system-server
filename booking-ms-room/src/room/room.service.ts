import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Room } from './entities/room.entity';
import { RoomFilter } from './dto/room-filter.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async findAll(filter: RoomFilter) {
    const queryBuilder = this.createFilteredQueryBuilder(filter);
    if (filter.page && filter.limit) {
      const [data, totalItems] = await queryBuilder
        .take(filter.limit)
        .skip((filter.page - 1) * filter.limit)
        .getManyAndCount();

      const totalPages = Math.ceil(totalItems / filter.limit);
      return {
        items: data,
        pagination: {
          page: filter.page,
          limit: filter.limit,
          totalPages,
          totalItems,
        },
      };
    }
    const items = await queryBuilder.getMany();
    return {
      items,
    };
  }

  async findByLevel(level: number) {
    return this.roomRepository.find({
      relations: ['level'],
      where: { levelId: level },
    });
  }

  private createFilteredQueryBuilder(
    filter: RoomFilter,
  ): SelectQueryBuilder<Room> {
    const { name, status, capacity, level } = filter;
    const queryBuilder = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.level', 'level');

    if (name) {
      queryBuilder.andWhere('room.name LIKE :name', { name: `%${name}%` });
    }
    if (status) {
      queryBuilder.andWhere('room.status = :status', { status });
    }
    if (capacity) {
      queryBuilder.andWhere('room.capacity = :capacity', { capacity });
    }
    if (level) {
      queryBuilder.andWhere('room.levelId = :level', { level });
    }

    return queryBuilder;
  }
}
