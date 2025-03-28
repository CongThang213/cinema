import { 
  Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn 
} from 'typeorm';
import { Ticket } from '../tickets/tickets';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { IsEmail, Length } from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(4, 20, { message: 'Username phải có từ 4-20 ký tự' })
  username: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @Column()
  @Exclude() // Ẩn password khi trả về client
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Ticket, (ticket) => ticket.user, { onDelete: 'CASCADE' })
  tickets: Ticket[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}
