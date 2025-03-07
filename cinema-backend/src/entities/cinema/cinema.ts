import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cinemas')
export class Cinema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  total_rooms: number;
}
