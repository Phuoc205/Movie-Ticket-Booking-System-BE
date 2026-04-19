import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { MovieEntity } from '../../movies/movie.entity/movie.entity';
import { RoomEntity } from '../../rooms/room.entity/room.entity';
import { BookingSeatEntity } from '../../booking_seats/booking_seat.entity/booking_seat.entity';
import { BookingEntity } from '../../bookings/booking.entity/booking.entity';

@Entity('showtimes')
export class ShowtimeEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'timestamp' })
    start_time!: Date;

    @Column({ type: 'timestamp' })
    end_time!: Date;

    @Column('int')
    price!: number;

    // N-1 với Room
    @ManyToOne(() => RoomEntity, (room) => room.showtimes, {
        onDelete: 'CASCADE',
    })
    room!: RoomEntity;

    // N-1 với Movie
    @ManyToOne(() => MovieEntity, (movie) => movie.showtimes, {
        onDelete: 'CASCADE',
    })
    movie!: MovieEntity;

    // 1-N với booking_seats
    @OneToMany(() => BookingSeatEntity, (bs) => bs.showtime)
    booking_seats!: BookingSeatEntity[];

    // 1-N với booking
    @OneToMany(() => BookingEntity, (booking) => booking.showtime)
    bookings!: BookingEntity[];
}