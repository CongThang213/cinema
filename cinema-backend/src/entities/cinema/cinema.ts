import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Theater } from '../theaters/theater';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => Theater, (theater) => theater.cinema, { cascade: true })
  theaters: Theater[];
}
