import { Module } from '@nestjs/common';
import { SeatController } from './seats.controller';
import { SeatService } from './seats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatEntity } from './seat.entity/seat.entity';
import { BookingSeatEntity } from 'src/booking_seats/booking_seat.entity/booking_seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeatEntity, BookingSeatEntity]),
  ],
  controllers: [SeatController],
  providers: [SeatService]
})
export class SeatsModule {}
