import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from '../bookings/booking.entity/booking.entity';
import { PaymentEntity } from '../payments/payment.entity/payment.entity';
import { UserEntity } from '../users/user.entity/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepo: Repository<BookingEntity>,

    @InjectRepository(PaymentEntity)
    private paymentRepo: Repository<PaymentEntity>,

    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  // =========================
  // 1. OVERVIEW
  // =========================
  async getOverview(user: any) {
    if (!['ADMIN', 'STAFF'].includes(user.role)) {
      throw new UnauthorizedException();
    }

    const revenueResult = await this.paymentRepo
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'revenue')
      .where('payment.status = :status', { status: 'SUCCESS' })
      .getRawOne();

    const ticketResult = await this.bookingRepo
      .createQueryBuilder('booking')
      .select('COUNT(*)', 'totalBookings')
      .getRawOne();

    return {
      revenue: Number(revenueResult.revenue) || 0,
      total_bookings: Number(ticketResult.totalBookings) || 0,
    };
  }

  // =========================
  // 2. REVENUE BY DAY
  // =========================
  async getRevenueByDay(start: Date, end: Date) {
    return this.paymentRepo
      .createQueryBuilder('payment')
      .select("DATE(payment.created_at)", "date")
      .addSelect("SUM(payment.amount)", "revenue")
      .where('payment.status = :status', { status: 'SUCCESS' })
      .andWhere('payment.created_at BETWEEN :start AND :end', {
        start,
        end,
      })
      .groupBy("DATE(payment.created_at)")
      .orderBy("date", "ASC")
      .getRawMany();
  }

  // =========================
  // 3. TOP MOVIES
  // =========================
  async getTopMovies(limit = 10) {
    return this.bookingRepo
      .createQueryBuilder('booking')
      .leftJoin('booking.showtime', 'showtime')
      .leftJoin('showtime.movie', 'movie')
      .leftJoin('booking.booking_seats', 'seat') // IMPORTANT
      .select('movie.id', 'movieId')
      .addSelect('movie.title', 'movieTitle')
      .addSelect('COUNT(seat.id)', 'totalTickets')
      .addSelect('SUM(booking.total_price)', 'revenue')
      .groupBy('movie.id')
      .addGroupBy('movie.title')
      .orderBy('totalTickets', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  // =========================
  // 4. TOP BUYERS
  // =========================
  async getTopBuyers(limit = 10) {
    return this.paymentRepo
      .createQueryBuilder('payment')
      .leftJoin('payment.booking', 'booking')
      .leftJoin('booking.user', 'user')
      .select('user.id', 'userId')
      .addSelect('user.full_name', 'fullName')
      .addSelect('SUM(payment.amount)', 'totalSpent')
      .addSelect('COUNT(payment.id)', 'totalPayments')
      .where('payment.status = :status', { status: 'SUCCESS' })
      .groupBy('user.id')
      .addGroupBy('user.full_name')
      .orderBy('SUM(payment.amount)', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  // =========================
  // 5. Doanh thu theo phim
  // =========================
  async getRevenueByMovie(limit = 10) {
    return this.paymentRepo
      .createQueryBuilder('payment')
      .leftJoin('payment.booking', 'booking')
      .leftJoin('booking.showtime', 'showtime')
      .leftJoin('showtime.movie', 'movie')
      .select('movie.id', 'movieId')
      .addSelect('movie.title', 'movieTitle')
      .addSelect('SUM(payment.amount)', 'revenue')
      .where('payment.status = :status', { status: 'SUCCESS' })
      .groupBy('movie.id')
      .addGroupBy('movie.title')
      .orderBy('revenue', 'DESC')
      .limit(limit)
      .getRawMany();
  }
}