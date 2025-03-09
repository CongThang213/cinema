import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from '../movies/movie';
import { Theater } from '../theaters/theater';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string; // Giờ chiếu

  @ManyToOne(() => Movie)
  movie: Movie;

  @ManyToOne(() => Theater)
  theater: Theater;
}

