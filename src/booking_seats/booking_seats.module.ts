import { Module } from '@nestjs/common';
import { BookingSeatsController } from './booking_seats.controller';
import { BookingSeatsService } from './booking_seats.service';

@Module({
  controllers: [BookingSeatsController],
  providers: [BookingSeatsService]
})
export class BookingSeatsModule {}
