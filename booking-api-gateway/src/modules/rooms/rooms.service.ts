import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HTTP_CLIENT } from '../../common/constants/tokens';
import { IHttpClient } from '../../common/interfaces/http-client.interface';
import { RoomFilter } from './dto/room-filter.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  private readonly roomBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: IHttpClient,
  ) {
    this.roomBaseUrl = this.configService.get<string>('config.roomServiceUrl');
  }

  public async findAllRoomsFilters(filter: RoomFilter) {
    const response = await this.httpClient.get(this.roomBaseUrl, {
      params: filter,
    });
    console.log({ response });
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }

  public async findRoomById(id: number) {
    const response = await this.httpClient.get(`${this.roomBaseUrl}/${id}`);
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }

  public async findRoomByLevel(level: number) {
    const response = await this.httpClient.get(
      `${this.roomBaseUrl}/level/${level}`,
    );
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }

  public async findRoomByStatus() {
    const response = await this.httpClient.get(
      `${this.roomBaseUrl}/status/active`,
    );
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }

  public async createRoom(createRoomDto: CreateRoomDto) {
    const response = await this.httpClient.post(
      `${this.roomBaseUrl}`,
      createRoomDto,
    );
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }

  public async updateRoom(id: number, updateRoomDto: UpdateRoomDto) {
    const response = await this.httpClient.put(
      `${this.roomBaseUrl}/${id}`,
      updateRoomDto,
    );
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }
}
