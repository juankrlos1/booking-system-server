import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { HTTP_CLIENT } from '../../common/constants/tokens';
import { AxiosHttpClientService } from '../../common/client/axios-http-client.service';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [LevelsController],
  providers: [
    LevelsService,
    {
      provide: HTTP_CLIENT,
      useClass: AxiosHttpClientService,
    },
  ],
})
export class LevelsModule {}
