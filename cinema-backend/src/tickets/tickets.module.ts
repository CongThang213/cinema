import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from 'src/entities/tickets/tickets';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/entities/user/user';
import { Showtime } from 'src/entities/showtimes/showtime';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, User, Showtime]),
    AuthModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
