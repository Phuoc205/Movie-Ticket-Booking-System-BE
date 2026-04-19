import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './payment.entity/payment.entity';
import { BookingEntity } from '../bookings/booking.entity/booking.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private paymentRepo: Repository<PaymentEntity>,

        @InjectRepository(BookingEntity)
        private bookingRepo: Repository<BookingEntity>,
    ) {}

    async createPayment(bookingId: string, method: string) {
        const booking = await this.bookingRepo.findOne({
            where: { id: bookingId },
        });

        if (!booking) {
            throw new BadRequestException('Booking not found');
        }

        const payment = this.paymentRepo.create({
            booking,
            method,
            status: 'SUCCESS', // mock
            amount: booking.total_price,
        });

        return this.paymentRepo.save(payment);
    }

    async getByBooking(bookingId: string) {
        return this.paymentRepo.find({
            where: { booking: { id: bookingId } },
        });
    }

    async findAll() {
        return this.paymentRepo.find({
            relations: ['booking'],
            order: { created_at: 'DESC' },
        });
    }
}
