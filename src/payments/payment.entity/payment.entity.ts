import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BookingEntity } from '../../bookings/booking.entity/booking.entity';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => BookingEntity, (booking) => booking.payments)
  booking!: BookingEntity;

  @Column()
  method!: string;

  @Column()
  status!: string;

  @Column({ type: 'int' })
  amount!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}