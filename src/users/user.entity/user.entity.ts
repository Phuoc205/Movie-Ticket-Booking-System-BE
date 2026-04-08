import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BookingEntity } from '../../bookings/booking.entity/booking.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  full_name!: string;

  @Column({ type: 'timestamp', nullable: true })
  birthdate!: Date;

  @Column()
  role!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @OneToMany(() => BookingEntity, (booking) => booking.user)
  bookings!: BookingEntity[];
}