import { Module } from '@nestjs/common';
import { ShowtimeController } from './showtimes.controller';
import { ShowtimeService } from './showtimes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowtimeEntity } from './showtime.entity/showtime.entity';
import { MovieEntity } from 'src/movies/movie.entity/movie.entity';
import { RoomEntity } from 'src/rooms/room.entity/room.entity';
import { BookingEntity } from 'src/bookings/booking.entity/booking.entity';
import { BookingSeatEntity } from 'src/booking_seats/booking_seat.entity/booking_seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShowtimeEntity, MovieEntity, RoomEntity, BookingEntity, BookingSeatEntity]),
  ],
  controllers: [ShowtimeController],
  providers: [ShowtimeService]
})
export class ShowtimesModule {}
