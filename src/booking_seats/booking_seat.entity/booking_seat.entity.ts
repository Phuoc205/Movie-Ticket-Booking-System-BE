import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { MovieEntity } from '../../movies/movie.entity/movie.entity';
import { RoomEntity } from '../../rooms/room.entity/room.entity';
import { BookingEntity } from '../../bookings/booking.entity/booking.entity';
import { SeatEntity } from '../../seats/seat.entity/seat.entity';
import { ShowtimeEntity } from '../../showtimes/showtime.entity/showtime.entity';

@Entity('booking_seats')
export class BookingSeatEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => BookingEntity, (booking) => booking.booking_seats, {
    onDelete: 'CASCADE',
  })
  booking!: BookingEntity;

  @ManyToOne(() => SeatEntity)
  seat!: SeatEntity;

  @ManyToOne(() => ShowtimeEntity, (showtime) => showtime.booking_seats)
  showtime!: ShowtimeEntity;
}