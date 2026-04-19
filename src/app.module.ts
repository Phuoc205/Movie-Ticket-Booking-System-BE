import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './users/users.controller';
import { RoomController } from './rooms/rooms.controller';
import { AuthController } from './auth/auth.controller';
import { MovieController } from './movies/movies.controller';
import { ShowtimeController } from './showtimes/showtimes.controller';
import { SeatController } from './seats/seats.controller';
import { BookingController } from './bookings/bookings.controller';
import { PaymentController } from './payments/payments.controller';
import { ReportsController } from './reports/reports.controller';

import { UserService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { MovieService } from './movies/movies.service';
import { ShowtimeService } from './showtimes/showtimes.service';
import { RoomService } from './rooms/rooms.service';
import { SeatService } from './seats/seats.service';
import { BookingService } from './bookings/bookings.service';
import { PaymentService } from './payments/payments.service';
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

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
