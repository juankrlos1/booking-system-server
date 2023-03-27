import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HTTP_CLIENT } from '../../common/constants/tokens';
import { IHttpClient } from '../../common/interfaces/http-client.interface';
import { ReservationFilter } from './dto/reservation-filter.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  private readonly reservationBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: IHttpClient,
  ) {
    this.reservationBaseUrl = this.configService.get<string>(
      'config.coreServiceUrl',
    );
  }

  async getReservationsWithFilters(filter: ReservationFilter) {
    const response = await this.httpClient.get(this.reservationBaseUrl, {
      params: filter,
    });
    console.log({ response });
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }

  async getReservationsByUser(id: number) {
    const response = await this.httpClient.get(
      `${this.reservationBaseUrl}/user/${id}`,
    );
    console.log({ response });
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }

  async createReservationByUser(createReservationDto: CreateReservationDto) {
    const response = await this.httpClient.post(
      this.reservationBaseUrl,
      createReservationDto,
    );
    console.log({ response });
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }

  async cancelReservation(id: number) {
    const response = await this.httpClient.post(
      this.reservationBaseUrl + '/' + id + '/cancel',
    );
    console.log({ response });
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }
}
