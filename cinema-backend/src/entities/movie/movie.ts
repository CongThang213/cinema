import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  duration: number; // in minutes

  @Column({ type: 'date' })
  release_date: Date;

  @Column()
  poster_url: string;

  @Column()
  genre: string;
}
