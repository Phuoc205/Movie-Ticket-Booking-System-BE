import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SeatEntity } from '../../seats/seat.entity/seat.entity';
import { ShowtimeEntity } from '../../showtimes/showtime.entity/showtime.entity'

@Entity('rooms')
export class RoomEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'int', nullable: true })
    total_seats!: number;

    // Quan hệ 1 - N với seats
    @OneToMany(() => SeatEntity, (seat) => seat.room)
    seats!: SeatEntity[];

    // Quan hệ 1 - N với showtimes
    @OneToMany(() => ShowtimeEntity, (showtime) => showtime.room)
    showtimes!: ShowtimeEntity[];
}