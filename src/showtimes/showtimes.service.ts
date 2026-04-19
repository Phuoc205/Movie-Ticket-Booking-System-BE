import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ShowtimeEntity } from './showtime.entity/showtime.entity';
import { BadRequestException } from '@nestjs/common';
import { BookingEntity } from 'src/bookings/booking.entity/booking.entity';
import { BookingSeatEntity } from 'src/booking_seats/booking_seat.entity/booking_seat.entity';

@Injectable()
export class ShowtimeService {
    constructor(
        @InjectRepository(ShowtimeEntity)
        private showtimeRepo: Repository<ShowtimeEntity>,

        @InjectRepository(BookingEntity)
        private bookingRepo: Repository<BookingEntity>,

        @InjectRepository(BookingSeatEntity)
        private bookingSeatRepo: Repository<BookingSeatEntity>,
    ) {}

    async create(data: any) {
        if (data.price <= 0) {
            throw new BadRequestException('Price must be > 0');
        }
        const showtime = this.showtimeRepo.create({
            start_time: data.start_time,
            end_time: data.end_time ?? data.start_time,
            price: data.price,

            movie: { id: data.movie_id },
            room: { id: data.room_id },
        });

        return this.showtimeRepo.save(showtime);
    }

    async findAll() {
        return this.showtimeRepo.find({
            relations: ['movie', 'room'],
            order: { start_time: 'ASC' },
        });
    }

    async findByMovie(movieId: string) {
        return this.showtimeRepo.find({
            where: { movie: { id: movieId } },
            relations: ['room', 'movie'],
            order: { start_time: 'ASC' },
        });
    }

    async findOne(id: string) {
        const showtime = await this.showtimeRepo.findOne({
            where: { id },
            relations: ['movie', 'room'],
        });

        if (!showtime) throw new NotFoundException('Showtime not found');
        return showtime;
    }

    async update(id: string, data: any) {
        const showtime = await this.findOne(id);
        if (data.start_time) {
            showtime.start_time = new Date(data.start_time);
        }
        if (data.end_time) {
            showtime.end_time = new Date(data.end_time);
        }
        if (data.price !== undefined) {
            showtime.price = data.price;
        }
        if (data.movie_id) {
            showtime.movie = { id: data.movie_id } as any;
        }
        if (data.room_id) {
            showtime.room = { id: data.room_id } as any;
        }
        return this.showtimeRepo.save(showtime);
    }

    async remove(id: string) {
        return this.showtimeRepo.delete(id);
    }

    async resetSeatsByShowtime(showtimeId: string) {
        // 1. check showtime tồn tại
        const showtime = await this.showtimeRepo.findOne({
            where: { id: showtimeId },
            relations: ['room'],
        });

        if (!showtime) {
            throw new BadRequestException('Showtime không tồn tại');
        }

        // 2. lấy tất cả booking của showtime này
        const bookings = await this.bookingRepo.find({
            where: { showtime: { id: showtimeId } },
            relations: ['booking_seats'],
        });

        const bookingIds = bookings.map(b => b.id);

        // 3. xóa booking_seats
        if (bookingIds.length > 0) {
            await this.bookingSeatRepo.delete({
            booking: { id: In(bookingIds) },
            });
        }

        // 4. xóa booking
        await this.bookingRepo.delete({
            showtime: { id: showtimeId },
        });

        return {
            message: 'Reset ghế theo suất chiếu thành công',
        };
    }
}