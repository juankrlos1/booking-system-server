import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HTTP_CLIENT } from '../../common/constants/tokens';
import { IHttpClient } from '../../common/interfaces/http-client.interface';

@Injectable()
export class UsersService {
  private readonly userBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: IHttpClient,
  ) {
    this.userBaseUrl = this.configService.get<string>('config.userServiceUrl');
  }

  public async getUsers() {
    const response = await this.httpClient.get(this.userBaseUrl);
    console.log({ response });
    return response;
  }

  public async getUserById(id: number) {
    const response = await this.httpClient.get(this.userBaseUrl + '/' + id);
    console.log({ response });
    return response;
  }
}
