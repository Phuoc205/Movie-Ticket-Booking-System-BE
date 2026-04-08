import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users/users.controller';
import { RoomsController } from './rooms/rooms.controller';
import { AuthController } from './auth/auth.controller';
import { MoviesController } from './movies/movies.controller';
import { ShowtimesController } from './showtimes/showtimes.controller';
import { SeatsController } from './seats/seats.controller';
import { BookingsController } from './bookings/bookings.controller';
import { PaymentsController } from './payments/payments.controller';
import { ReportsController } from './reports/reports.controller';

import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { MoviesService } from './movies/movies.service';
import { ShowtimesService } from './showtimes/showtimes.service';
import { RoomsService } from './rooms/rooms.service';
import { SeatsService } from './seats/seats.service';
import { BookingsService } from './bookings/bookings.service';
import { PaymentsService } from './payments/payments.service';
import { ReportsService } from './reports/reports.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { RoomsModule } from './rooms/rooms.module';
import { SeatsModule } from './seats/seats.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';
import { BookingSeatsModule } from './booking_seats/booking_seats.module';
import { VoucherModule } from './voucher/voucher.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-ap-southeast-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.tmoxzatryuomswsfwfzs',
      password: 'tanphuoc12062005',
      database: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    MoviesModule,
    ShowtimesModule,
    RoomsModule,
    UsersModule,
    MoviesModule,
    ShowtimesModule,
    RoomsModule,
    SeatsModule,
    BookingsModule,
    PaymentsModule,
    ReportsModule,
    BookingSeatsModule,
    VoucherModule,
  ],
  controllers: [AppController, UsersController, RoomsController, AuthController, MoviesController, ShowtimesController, SeatsController, BookingsController, PaymentsController, ReportsController],
  providers: [AppService, UsersService, AuthService, MoviesService, ShowtimesService, RoomsService, SeatsService, BookingsService, PaymentsService, ReportsService],
})
export class AppModule {}
