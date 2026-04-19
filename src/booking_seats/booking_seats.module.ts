import { Module } from '@nestjs/common';
import { BookingSeatController } from './booking_seats.controller';
import { BookingSeatService } from './booking_seats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingSeatEntity } from './booking_seat.entity/booking_seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingSeatEntity]),
  ],
  controllers: [BookingSeatController],
  providers: [BookingSeatService]
})
export class BookingSeatsModule {}
