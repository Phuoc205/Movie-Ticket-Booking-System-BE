import { Module } from '@nestjs/common';
import { BookingController } from './bookings.controller';
import { BookingService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './booking.entity/booking.entity';
import { BookingSeatEntity } from 'src/booking_seats/booking_seat.entity/booking_seat.entity';
import { ShowtimeEntity } from 'src/showtimes/showtime.entity/showtime.entity';
import { SeatEntity } from 'src/seats/seat.entity/seat.entity';
import { VoucherEntity } from 'src/voucher/voucher.entity/voucher.entity';
import { UserEntity } from 'src/users/user.entity/user.entity';
import { PaymentEntity } from 'src/payments/payment.entity/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity, BookingSeatEntity, ShowtimeEntity, SeatEntity, VoucherEntity, UserEntity, PaymentEntity]),
  ],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingsModule {}
