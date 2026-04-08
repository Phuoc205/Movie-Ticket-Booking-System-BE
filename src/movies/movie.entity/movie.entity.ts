import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ShowtimeEntity } from '../../showtimes/showtime.entity/showtime.entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column('int')
  duration!: number;

  @Column()
  trailer_url!: string;

  @Column()
  genre!: string;

  @Column({ type: 'timestamp' })
  release_date!: Date;

  @Column()
  status!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @OneToMany(() => ShowtimeEntity, (showtime) => showtime.movie)
  showtimes!: ShowtimeEntity[];
}