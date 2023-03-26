import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { IHttpClient } from '../../common/interfaces/http-client.interface';
import { HTTP_CLIENT } from '../../common/constants/tokens';

@Injectable()
export class AuthService {
  private readonly authBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: IHttpClient,
  ) {
    this.authBaseUrl = this.configService.get<string>('config.authServiceUrl');
  }

  public async login(loginUserDto: LoginUserDto) {
    const response = await this.httpClient.post(
      this.authBaseUrl + '/login',
      loginUserDto,
    );
    if (!response.accessToken) throw new UnauthorizedException();

    return response.accessToken;
  }
}
