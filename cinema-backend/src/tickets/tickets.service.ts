import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/tickets/tickets';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}

  findAll(): Promise<Ticket[]> {
    return this.ticketsRepository.find();
  }

  findOne(id: number): Promise<Ticket | null> {
    return this.ticketsRepository.findOne({ where: { id } });
  }

  create(ticket: Ticket): Promise<Ticket> {
    return this.ticketsRepository.save(ticket);
  }

  async update(id: number, ticket: Ticket): Promise<Ticket | null> {
    await this.ticketsRepository.update(id, ticket);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ticketsRepository.delete(id);
  }
}
