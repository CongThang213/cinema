import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Movie } from '../movies/movie';
import { Theater } from '../theaters/theater';
import { Ticket } from '../tickets/tickets';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @ManyToOne(() => Movie, (movie) => movie.showtimes, { onDelete: 'CASCADE' })
  movie: Movie;

  @ManyToOne(() => Theater, (theater) => theater.showtimes, { onDelete: 'CASCADE' })
  theater: Theater;

  @OneToMany(() => Ticket, (ticket) => ticket.showtime, { cascade: true })
  tickets: Ticket[];
}
