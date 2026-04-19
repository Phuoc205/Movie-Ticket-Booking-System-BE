import { Module } from '@nestjs/common';
import { PaymentController } from './payments.controller';
import { PaymentService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './payment.entity/payment.entity';
import { BookingEntity } from 'src/bookings/booking.entity/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, BookingEntity]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentsModule {}
