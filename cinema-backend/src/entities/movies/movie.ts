import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from '../showtimes/showtime';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  genre: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true }) // Cho phép null nếu không có ảnh
  posterUrl?: string;

  @Column()
  duration: number; // Thời lượng phim (phút)

  @OneToMany(() => Showtime, (showtime) => showtime.movie, { onDelete: 'CASCADE' })
  showtimes: Showtime[];

}
