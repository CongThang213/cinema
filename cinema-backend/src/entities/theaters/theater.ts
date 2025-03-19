import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cinema } from '../cinema/cinema';
import { Showtime } from '../showtimes/showtime';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number; // Số ghế

  @ManyToOne(() => Cinema, (cinema) => cinema.theaters, { onDelete: 'CASCADE' })
  cinema: Cinema;

  @OneToMany(() => Showtime, (showtime) => showtime.theater, { cascade: true })
  showtimes: Showtime[];
}
