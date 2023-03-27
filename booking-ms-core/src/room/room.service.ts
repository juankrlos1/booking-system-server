import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HTTP_CLIENT } from '../common/constants/tokens';
import { IHttpClient } from '../common/interfaces/http-client.interface';

@Injectable()
export class RoomService {
  private logger = new Logger(RoomService.name);
  private readonly roomBaseUrl: string;
  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: IHttpClient,
  ) {
    this.roomBaseUrl = this.configService.get<string>('config.roomServiceUrl');
  }

  async getRoomById(id: number) {
    const response = await this.httpClient.get(`${this.roomBaseUrl}/${id}`);
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    this.logger.debug({ response });
    return response;
  }

  async updateRoomToActive(id: number) {
    const response = await this.httpClient.get(`${this.roomBaseUrl}/status/active/${id}`);
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    this.logger.debug({ response });
    return response;
  }
}
