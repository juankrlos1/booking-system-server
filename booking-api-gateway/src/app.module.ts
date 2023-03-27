import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { AdminModule } from './modules/admin/admin.module';
import { HttpClientModule } from './modules/http-client/http-client.module';
import config from './config/microservices.config';
import { AxiosHttpClientService } from './common/client/axios-http-client.service';
import { LevelsModule } from './modules/levels/levels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    UsersModule,
    RoomsModule,
    NotificationsModule,
    ReservationsModule,
    AdminModule,
    HttpClientModule,
    LevelsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AxiosHttpClientService],
})
export class AppModule {}
