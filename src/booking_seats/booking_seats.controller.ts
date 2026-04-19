import { Controller, Get, Param } from '@nestjs/common';
import { BookingSeatService } from './booking_seats.service';

@Controller('booking-seats')
export class BookingSeatController {
    constructor(private readonly service: BookingSeatService) {}

    @Get(':showtimeId')
    getBookedSeats(@Param('showtimeId') showtimeId: string) {
        return this.service.getBookedSeats(showtimeId);
    }

    @Get('detail/:showtimeId')
    getDetail(@Param('showtimeId') showtimeId: string) {
        return this.service.getDetail(showtimeId);
    }
}