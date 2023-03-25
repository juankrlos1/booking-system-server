import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AUTH_SERVICE_NAME, LoginResponse } from './proto/auth.pb';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  loginGrpc(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login(loginUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    console.log('request: ', loginUserDto);
    return this.authService.login(loginUserDto);
  }
}
