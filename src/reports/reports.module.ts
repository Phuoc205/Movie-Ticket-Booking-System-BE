import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from 'src/bookings/booking.entity/booking.entity';
import { PaymentEntity } from 'src/payments/payment.entity/payment.entity';
import { UserEntity } from 'src/users/user.entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity, PaymentEntity, UserEntity]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
