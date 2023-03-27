import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HTTP_CLIENT } from '../../common/constants/tokens';
import { IHttpClient } from '../../common/interfaces/http-client.interface';

@Injectable()
export class LevelsService {
  private readonly roomBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: IHttpClient,
  ) {
    this.roomBaseUrl = this.configService
      .get<string>('config.roomServiceUrl')
      .replace('rooms', '');
  }

  public async findLevelsByBuilding(id: number) {
    console.log(`${this.roomBaseUrl}levels/building/${id}`);
    const response = await this.httpClient.get(
      `${this.roomBaseUrl}levels/building/${id}`,
    );
    console.log(response);
    if (response.items && response.items.length === 0)
      throw new NotFoundException();
    return response;
  }
}
