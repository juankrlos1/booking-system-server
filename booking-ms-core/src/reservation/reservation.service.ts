import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { IHttpClient } from '../common/interfaces/http-client.interface';
import { HTTP_CLIENT } from '../common/constants/tokens';
import { ReservationFilter } from './dto/reservation-filter.dto';
import { ReservationMapper } from './mappers/reservation.mapper';
import { RoomService } from '../room/room.service';
import { ReservationResponse } from './interfaces/reservation.response';

@Injectable()
export class ReservationService {
  private readonly userBaseUrl: string;

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly configService: ConfigService,
    private readonly reservationMapper: ReservationMapper,
    private readonly roomService: RoomService,
    @Inject(HTTP_CLIENT) private readonly httpClient: IHttpClient,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    const reservation = this.reservationRepository.create(createReservationDto);
    return await this.reservationRepository.save(reservation);
  }

  async cancelReservation(id: number) {
    await this.reservationRepository.update(id, { status: 'CANCELED' });
    await this.roomService.updateRoomToActive(id);
    return 'Reservation successfully cancelled!';
  }

  async findAll(filter: ReservationFilter) {
    const queryBuilder = this.createFilteredQueryBuilderBooking(filter);
    if (filter.page && filter.limit) {
      const [data, totalItems] = await queryBuilder
        .take(filter.limit)
        .skip((filter.page - 1) * filter.limit)
        .getManyAndCount();

      const totalPages = Math.ceil(totalItems / filter.limit);
      return {
        items: this.reservationMapper.toResponseDtoList(data),
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
      items: this.reservationMapper.toResponseDtoList(items),
    };
  }

  async findByUser(id: number) {
    const reservations = await this.reservationRepository.find({
      where: { userId: id },
    });
    return {
      items: await this.mapAddRoomName(
        this.reservationMapper.toResponseDtoList(reservations),
      ),
    };
  }

  private async mapAddRoomName(
    reservations: ReservationResponse[],
  ): Promise<ReservationResponse[]> {
    for (const reservation of reservations) {
      const room = await this.roomService.getRoomById(reservation.roomId);
      reservation.roomName = room.items.name;
    }
    return reservations;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }

  private async fetchReservationData() {}

  private createFilteredQueryBuilderBooking(
    filter: ReservationFilter,
  ): SelectQueryBuilder<Reservation> {
    const { userId, status, roomId, reservationDate } = filter;
    const queryBuilder = this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.reservationUsers', 'reservation_user');

    if (userId) {
      queryBuilder.andWhere('reservation.user_id :userId', { user_id: userId });
    }
    if (roomId) {
      queryBuilder.andWhere('reservation.room_id :roomId', { room_id: roomId });
    }
    if (status) {
      queryBuilder.andWhere('reservation.status = :status', { status });
    }
    if (reservationDate) {
      queryBuilder.andWhere('reservation.reservation_date = :reservationDate', {
        reservationDate,
      });
    }

    return queryBuilder;
  }
}
