import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    let user = null;
    try {
      user = await this.userRepository.findOne({
        where: { email },
        relations: ['role', 'area'],
      });
    } catch (e) {
      this.handleDBErrors(e);
    }

    this.logger.debug('Selected user: ', { user });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
      area: user.area.name,
      email: user.email,
      color: this.randomColorAvatar(),
    };

    return {
      accessToken: this.getJwtToken(payload),
    };
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);

    throw new InternalServerErrorException();
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    this.logger.debug('Returned token: ' + token);
    return token;
  }

  randomColorAvatar() {
    const colorArray = [
      '#000000',
      '#003EFF',
      '#008000',
      '#800080',
      '#B22222',
      '#FF69B4',
      '#EEC900',
      '#EE7600',
    ];
    const length = colorArray.length;
    const value = Math.floor(Math.random() * length) + 1;
    return colorArray[value];
  }
}
