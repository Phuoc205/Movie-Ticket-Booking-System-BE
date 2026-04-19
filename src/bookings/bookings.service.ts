import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BookingEntity } from './booking.entity/booking.entity';
import { BookingSeatEntity } from '../booking_seats/booking_seat.entity/booking_seat.entity';
import { ShowtimeEntity } from '../showtimes/showtime.entity/showtime.entity';
import { SeatEntity } from '../seats/seat.entity/seat.entity';
import { UserEntity } from '../users/user.entity/user.entity';
import { VoucherEntity } from 'src/voucher/voucher.entity/voucher.entity';
import { UnauthorizedException } from '@nestjs/common';
import { PaymentEntity } from 'src/payments/payment.entity/payment.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepo: Repository<BookingEntity>,

    @InjectRepository(BookingSeatEntity)
    private bookingSeatRepo: Repository<BookingSeatEntity>,

    @InjectRepository(ShowtimeEntity)
    private showtimeRepo: Repository<ShowtimeEntity>,

    @InjectRepository(SeatEntity)
    private seatRepo: Repository<SeatEntity>,

    @InjectRepository(VoucherEntity) 
    private voucherRepo: Repository<VoucherEntity>,

    @InjectRepository(PaymentEntity)
    private paymentRepo: Repository<PaymentEntity>,
  ) {}

  async createBooking(user: UserEntity, dto: any) {
    const { showtimeId, seatIds, voucher_id } = dto;

    // 1. check ghế
    const existing = await this.bookingSeatRepo.find({
      where: {
        showtime: { id: showtimeId },
        seat: { id: In(seatIds) },
      },
    });

    if (existing.length > 0) {
      throw new BadRequestException('Some seats already booked');
    }

    // 2. showtime
    const showtime = await this.showtimeRepo.findOne({
      where: { id: showtimeId },
      relations: ['room'],
    });

    if (!showtime) {
      throw new BadRequestException('Showtime not found');
    }

    // 3. seats
    const seats = await this.seatRepo.find({
      where: { id: In(seatIds) },
      relations: ['room'],
    });

    const invalidSeats = seats.filter(
      (seat) => seat.room.id !== showtime.room.id
    );

    if (invalidSeats.length > 0) {
      throw new BadRequestException('Invalid seats');
    }

    // 4. total
    let basePrice = showtime.price;

    if (showtime.room.type === 'VIP') {
      basePrice = basePrice * 1.5;
    }

    let total = seats.length * basePrice;

    // 5. voucher
    if (voucher_id) {
      const voucher = await this.voucherRepo.findOne({
        where: { id: voucher_id },
      });

      if (!voucher) throw new BadRequestException('Voucher không tồn tại');

      if (!voucher.is_active) throw new BadRequestException('Voucher không khả dụng');

      if (voucher.used >= voucher.quantity)
        throw new BadRequestException('Voucher đã hết lượt');

      if (new Date(voucher.expired_at) < new Date())
        throw new BadRequestException('Voucher đã hết hạn');

      const discount = (total * voucher.discount) / 100;
      total -= discount;

      voucher.used += 1;
      await this.voucherRepo.save(voucher);
    }

    // 6. booking
    const booking = this.bookingRepo.create({
      user,
      showtime,
      total_price: total,
      status: 'CONFIRMED',
    });

    const savedBooking = await this.bookingRepo.save(booking);

    // 7. booking seats
    const bookingSeats = seats.map((seat) =>
      this.bookingSeatRepo.create({
        booking: savedBooking,
        seat,
        showtime,
      }),
    );

    await this.bookingSeatRepo.save(bookingSeats);

    // 9. Tạo payment
    const payment = this.paymentRepo.create({
      booking: savedBooking,
      amount: total,
      status: 'SUCCESS',
      method: dto.payment_method,
    });

    await this.paymentRepo.save(payment);

    return {
      message: 'Booking success',
      booking: savedBooking,
    };
  }

  async getHistory(userId: string) {
    return this.bookingRepo.find({
      where: { user: { id: userId } },
      relations: [
        'showtime',
        'showtime.movie',
        'showtime.room',
        'booking_seats',
        'booking_seats.seat',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getAllHistory(user: any) {
    if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
      throw new UnauthorizedException('Forbidden');
    }

    return this.bookingRepo.find({
      relations: [
        'user',
        'showtime',
        'showtime.movie',
        'showtime.room',
        'booking_seats',
        'booking_seats.seat',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async refundBooking(id: string, user: any) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: [
        'user',
        'showtime',
        'booking_seats',
        'booking_seats.seat',
      ],
    });

    if (!booking) throw new NotFoundException();

    // check owner
    if (booking.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    // check thời gian
    const now = new Date();
    const showtime = new Date(booking.showtime.start_time);

    const diff = (showtime.getTime() - now.getTime()) / (1000 * 60);

    if (diff < 60) {
      throw new BadRequestException('Không thể hoàn vé trước giờ chiếu 60 phút');
    }

    // update booking
    booking.status = 'REFUNDED';
    await this.bookingRepo.save(booking);

    // update payment
    await this.paymentRepo.update(
      { booking: { id } },
      { status: 'REFUNDED' }
    );

    return { message: 'Hoàn vé thành công' };
  }
}
