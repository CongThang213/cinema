import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Showtime } from '../showtimes/showtime';
import { User } from '../user/user';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false }) // Giới hạn độ dài số ghế
  seatNumber: string;

  @Column({ type: 'int', nullable: false }) // Đảm bảo không null
  price: number;

  @ManyToOne(() => Showtime, (showtime) => showtime.tickets, { onDelete: 'CASCADE', nullable: false })
  showtime: Showtime;

  @ManyToOne(() => User, (user) => user.tickets, { onDelete: 'SET NULL', nullable: true })
  user: User | null;
}
