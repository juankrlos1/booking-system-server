import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    console.log('request: ', loginUserDto);
    return this.authService.login(loginUserDto);
  }
}
