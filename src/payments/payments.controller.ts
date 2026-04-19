import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PaymentService } from './payments.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() body: any) {
    const { bookingId, method } = body;
    return this.paymentService.createPayment(bookingId, method);
  }

  @Get('booking/:bookingId')
  getByBooking(@Param('bookingId') bookingId: string) {
    return this.paymentService.getByBooking(bookingId);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }
}
