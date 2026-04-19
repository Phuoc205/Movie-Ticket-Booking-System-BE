import { Module } from '@nestjs/common';
import { RoomController } from './rooms.controller';
import { RoomService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity/room.entity';
import { SeatEntity } from '../seats/seat.entity/seat.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([RoomEntity, SeatEntity]),
    ],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomsModule {}
