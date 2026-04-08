import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { RoomEntity } from '../../rooms/room.entity/room.entity';
import { BookingSeatEntity } from '../../booking_seats/booking_seat.entity/booking_seat.entity';

@Entity('seats')
export class SeatEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    seat_number!: string;

    @Column()
    type!: string;

    @Column('int')
    price!: number;

    // Quan hệ N - 1 với rooms
    @ManyToOne(() => RoomEntity, (room) => room.seats, {
        onDelete: 'CASCADE',
    })
    room!: RoomEntity;

    // Quan hệ 1 - 1 với seats
    @OneToOne(() => BookingSeatEntity, (bookseat) => bookseat.seat)
    booking_seat!: RoomEntity;
}