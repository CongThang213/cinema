import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Showtime } from '../showtimes/showtime';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  seatNumber: string;

  @ManyToOne(() => Showtime)
  showtime: Showtime;
}
