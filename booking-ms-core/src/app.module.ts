import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './reservation/reservation.module';
import { ReservationUserModule } from './reservation-user/reservation-user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
      extra: {
        sslmode: process.env.DB_SSLMODE,
      },
    }),
    ReservationModule,
    ReservationUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
