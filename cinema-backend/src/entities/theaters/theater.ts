import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  totalSeats: number;
}
