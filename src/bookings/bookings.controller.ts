import { Controller, Post, Body, Req, Get, Param } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: any, @Req() req: any) {
    const user = req.user;
    return this.bookingService.createBooking(user, dto);
  }

  @Get('history')
  @UseGuards(AuthGuard('jwt'))
  async getHistory(@Req() req: any) {
    return this.bookingService.getHistory(req.user.id);
  }

  @Get('all-history')
  @UseGuards(AuthGuard('jwt'))
  getAllHistory(@Req() req: any) {
    return this.bookingService.getAllHistory(req.user);
  }

  @Post(':id/refund')
  @UseGuards(AuthGuard('jwt'))
  refund(@Param('id') id: string, @Req() req: any) {
    return this.bookingService.refundBooking(id, req.user);
  }
}
