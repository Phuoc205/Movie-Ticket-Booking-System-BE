import { Test, TestingModule } from '@nestjs/testing';
import { BookingSeatsController } from './booking_seats.controller';

describe('BookingSeatsController', () => {
  let controller: BookingSeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingSeatsController],
    }).compile();

    controller = module.get<BookingSeatsController>(BookingSeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
