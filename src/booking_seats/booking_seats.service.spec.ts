import { Test, TestingModule } from '@nestjs/testing';
import { BookingSeatsService } from './booking_seats.service';

describe('BookingSeatsService', () => {
  let service: BookingSeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingSeatsService],
    }).compile();

    service = module.get<BookingSeatsService>(BookingSeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
