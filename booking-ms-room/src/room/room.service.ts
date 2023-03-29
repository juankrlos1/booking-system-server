import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Room } from './entities/room.entity';
import { RoomFilter } from './dto/room-filter.dto';
import { RoomMapper } from './mappers/room.mapper';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly roomMapper: RoomMapper,
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
        items: this.roomMapper.toResponseDtoList(data),
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

  async findById(id: number) {
    const rooms = await this.roomRepository.findOne({
      relations: ['level'],
      where: { id },
    });
    return {
      items: this.roomMapper.toResponseDto(rooms),
    };
  }

  async findByLevel(level: number) {
    const rooms = await this.roomRepository.find({
      relations: ['level'],
      where: { levelId: level },
    });
    return {
      items: this.roomMapper.toResponseDtoList(rooms),
    };
  }

  async findByStatus() {
    const rooms = await this.roomRepository.find({
      relations: ['level'],
      where: { status: 'ACTIVO' },
    });
    return {
      items: this.roomMapper.toResponseDtoList(rooms),
    };
  }

  async updateStatusToActive(id: number) {
    return await this.roomRepository.update(id, { status: 'ACTIVO' });
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

  async createRoom(createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create(createRoomDto);
    return { items: await this.roomRepository.save(room) };
  }

  async updateRoom(id: number, updateRoomDto: UpdateRoomDto) {
    const user = await this.roomRepository.preload({
      id,
      ...updateRoomDto,
    });

    if (!user) {
      throw new NotFoundException(`Room with ID ${id} not found.`);
    }

    return { items: await this.roomRepository.save(user) };
  }
}
