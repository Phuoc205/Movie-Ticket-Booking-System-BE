import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SeatEntity } from '../../seats/seat.entity/seat.entity';
import { ShowtimeEntity } from '../../showtimes/showtime.entity/showtime.entity'

@Entity('rooms')
export class RoomEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'int' })
    total_seats!: number;

    @Column({ type: 'int' , nullable: true})
    seats_per_row!: number;

    @Column({
        type: 'enum',
        enum: ['NORMAL', 'VIP'],
        default: 'NORMAL',
    })
    type!: 'NORMAL' | 'VIP';

    // Quan hệ 1 - N với seats
    @OneToMany(() => SeatEntity, (seat) => seat.room)
    seats!: SeatEntity[];

    // Quan hệ 1 - N với showtimes
    @OneToMany(() => ShowtimeEntity, (showtime) => showtime.room)
    showtimes!: ShowtimeEntity[];
}