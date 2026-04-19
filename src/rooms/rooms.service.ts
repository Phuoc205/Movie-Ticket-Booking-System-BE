import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from './room.entity/room.entity';
import { SeatEntity } from 'src/seats/seat.entity/seat.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepo: Repository<RoomEntity>,

    @InjectRepository(SeatEntity)
    private seatRepo: Repository<SeatEntity>
  ) {}

  async create(createRoomDto: any) {
    const { name, total_seats, seats_per_row } = createRoomDto;

    // 1. create room
    const room = await this.roomRepo.save({
      name,
      total_seats,
      seats_per_row,
    });

    // 2. generate seats
    const seats: SeatEntity[] = [];

    const rows = Math.ceil(total_seats / seats_per_row);

    for (let i = 0; i < rows; i++) {
      const rowChar = String.fromCharCode(65 + i);

      for (let j = 1; j <= seats_per_row; j++) {
        if (seats.length >= total_seats) break;

        seats.push(
          this.seatRepo.create({
            room: { id: room.id } as any,
            seat_number: `${rowChar}${j}`
          })
        );
      }
    }

    await this.seatRepo.save(seats);

    return room;
  }

  async findAll() {
    return this.roomRepo.find({
      relations: ['seats'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string) {
    const room = await this.roomRepo.findOne({
      where: { id },
      relations: ['seats', 'showtimes'],
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async update(id: string, dto: any) {
    const room = await this.roomRepo.findOne({ where: { id } });

    if (!room) throw new NotFoundException();

    // 1. update room info
    await this.roomRepo.update(id, {
      name: dto.name,
      total_seats: dto.total_seats,
      seats_per_row: dto.seats_per_row,
    });

    // 2. delete old seats
    await this.seatRepo.delete({ room: { id } });

    // 3. generate new seats
    const seats: SeatEntity[] = [];
    const rows = Math.ceil(dto.total_seats / dto.seats_per_row);

    for (let i = 0; i < rows; i++) {
      const rowChar = String.fromCharCode(65 + i);

      for (let j = 1; j <= dto.seats_per_row; j++) {
        if (seats.length >= dto.total_seats) break;

        seats.push(
          this.seatRepo.create({
            room: { id } as any,
            seat_number: `${rowChar}${j}`
          })
        );
      }
    }

    await this.seatRepo.save(seats);

    return this.findOne(id);
  }

  async remove(id: string) {
    return this.roomRepo.delete(id);
  }
}