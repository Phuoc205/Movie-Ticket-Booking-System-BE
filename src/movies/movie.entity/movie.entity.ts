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

  @Column({ nullable: true })
  trailer_url!: string;

  @Column({ nullable: true })
  poster_url!: string;

  @Column({ nullable: true })
  genre!: string;

  @Column({ type: 'timestamp', nullable: true})
  release_date!: Date;

  @Column({default: "NOW_SHOWING"})
  status!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @OneToMany(() => ShowtimeEntity, (showtime) => showtime.movie)
  showtimes!: ShowtimeEntity[];
}