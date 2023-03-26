import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { IHttpClient } from '../common/interfaces/http-client.interface';
import { HTTP_CLIENT } from '../common/constants/tokens';

@Injectable()
export class ReservationService {
  private readonly reservationBaseUrl: string;

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: IHttpClient,
  ) {}
  create(createReservationDto: CreateReservationDto) {
    return 'This action adds a new reservation';
  }

  findAll() {
    return this.reservationRepository.find({
      relations: ['reservationUsers'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }

  private async fetchReservationData() {}
}
