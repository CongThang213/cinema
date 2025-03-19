import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from '../showtimes/showtime';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  duration: number; // Thời lượng phim (phút)

  @OneToMany(() => Showtime, (showtime) => showtime.movie, { cascade: true })
  showtimes: Showtime[];
}
