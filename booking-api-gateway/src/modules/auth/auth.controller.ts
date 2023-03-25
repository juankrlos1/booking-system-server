import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './proto/auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.svc.register(body);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Observable<LoginResponse> {
    return this.svc.login(loginUserDto);
  }
}
