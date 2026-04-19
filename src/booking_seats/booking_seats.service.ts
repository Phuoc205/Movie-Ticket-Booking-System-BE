import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingSeatEntity } from './booking_seat.entity/booking_seat.entity';

@Injectable()
export class BookingSeatService {
    constructor(
        @InjectRepository(BookingSeatEntity)
        private bookingSeatRepo: Repository<BookingSeatEntity>,
    ) {}

    async getBookedSeats(showtimeId: string) {
        const booked = await this.bookingSeatRepo.find({
        where: {
            showtime: { id: showtimeId },
        },
        relations: ['seat'],
        });

        return booked.map((b) => b.seat.id);
    }

    async getDetail(showtimeId: string) {
        return this.bookingSeatRepo.find({
        where: {
            showtime: { id: showtimeId },
        },
        relations: ['seat', 'booking'],
        });
    }
}
