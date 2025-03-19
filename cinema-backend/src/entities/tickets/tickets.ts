import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user';
import { Showtime } from '../showtimes/showtime';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatNumber: string;

  @ManyToOne(() => User, (user) => user.tickets, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Showtime, (showtime) => showtime.tickets, { onDelete: 'CASCADE' })
  showtime: Showtime;
}
