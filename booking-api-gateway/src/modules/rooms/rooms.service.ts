import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HTTP_CLIENT } from '../../common/constants/tokens';
import { IHttpClient } from '../../common/interfaces/http-client.interface';
import { RoomFilter } from './dto/room-filter.dto';

@Injectable()
export class RoomsService {
  private readonly roomBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: IHttpClient,
  ) {
    this.roomBaseUrl = this.configService.get<string>('config.roomServiceUrl');
  }

  public async getRooms(filter: RoomFilter) {
    const response = await this.httpClient.get(this.roomBaseUrl, {
      params: filter,
    });
    console.log({ response });
    return response;
  }
}
