import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BookingSeatEntity } from '../../booking_seats/booking_seat.entity/booking_seat.entity';
import { UserEntity } from '../../users/user.entity/user.entity';
import { ShowtimeEntity } from '../../showtimes/showtime.entity/showtime.entity';
import { PaymentEntity } from '../../payments/payment.entity/payment.entity';

@Entity('bookings')
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.bookings)
  user!: UserEntity;

  @ManyToOne(() => ShowtimeEntity, (showtime) => showtime.bookings)
  showtime!: ShowtimeEntity;

  @Column()
  status!: string;

  @Column({ type: 'int' })
  total_price!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @OneToMany(() => BookingSeatEntity, (bs) => bs.booking)
  booking_seats!: BookingSeatEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.booking)
  payments!: PaymentEntity[];
}