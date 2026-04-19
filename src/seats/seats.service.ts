import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatEntity } from './seat.entity/seat.entity';
import { BookingSeatEntity } from '../booking_seats/booking_seat.entity/booking_seat.entity';

@Injectable()
export class SeatService {
    constructor(
        @InjectRepository(SeatEntity)
        private seatRepo: Repository<SeatEntity>,

        @InjectRepository(BookingSeatEntity)
        private bookingSeatRepo: Repository<BookingSeatEntity>,
    ) {}

    async create(data: Partial<SeatEntity>) {
        const seat = this.seatRepo.create(data);
        return this.seatRepo.save(seat);
    }

    async findAll() {
        return this.seatRepo.find({
            relations: ['room'],
        });
    }

    async getSeatsByRoom(roomId: string, showtimeId: string) {
        // 1. lấy tất cả ghế trong phòng
        const seats = await this.seatRepo.find({
            where: { room: { id: roomId } },
            order: { seat_number: 'ASC' },
        });

        // 2. lấy ghế đã đặt theo showtime
        const bookedSeats = await this.bookingSeatRepo.find({
            where: {
                showtime: { id: showtimeId },
            },
            relations: ['seat'],
        });

        const bookedSeatIds = bookedSeats.map(bs => bs.seat.id);

        // 3. merge trạng thái
        return seats.map(seat => ({
            ...seat,
            is_booked: bookedSeatIds.includes(seat.id),
        }));
    }

    async findOne(id: string) {
        const seat = await this.seatRepo.findOne({
            where: { id },
            relations: ['room'],
        });

        if (!seat) throw new NotFoundException('Seat not found');
        return seat;
    }

    async update(id: string, data: Partial<SeatEntity>) {
        await this.seatRepo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string) {
        return this.seatRepo.delete(id);
    }
}