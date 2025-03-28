import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from '../showtimes/showtime';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Tên phòng chiếu

  @Column()
  capacity: number; // Sức chứa ghế ngồi

  @OneToMany(() => Showtime, (showtime) => showtime.theater, { onDelete: 'CASCADE' })
  showtimes: Showtime[];
}
