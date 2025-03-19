import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/tickets/tickets';
import { CreateTicketDto } from 'src/dto/create-ticket.dto';
import { UpdateTicketDto } from 'src/dto/update-ticket.dto';

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

  async create(createTicketDto: CreateTicketDto, userId: number): Promise<Ticket> {
    const newTicket = this.ticketsRepository.create({
      ...createTicketDto,
      user: { id: userId } as any, // Đảm bảo user được tạo đúng kiểu
    });
    return this.ticketsRepository.save(newTicket);
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket | null> {
    await this.ticketsRepository.update(id, updateTicketDto);
    return this.ticketsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.ticketsRepository.delete(id);
  }
}
