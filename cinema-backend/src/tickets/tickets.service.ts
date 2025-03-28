import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from 'src/entities/tickets/tickets';
import { CreateTicketDto } from 'src/dto/create-ticket.dto';
import { UpdateTicketDto } from 'src/dto/update-ticket.dto';
import { User } from 'src/entities/user/user';
import { Showtime } from 'src/entities/showtimes/showtime';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Showtime)
    private showtimesRepository: Repository<Showtime>,
  ) {}

  async findAll(): Promise<Ticket[]> {
    return this.ticketsRepository.find({ relations: ['user', 'showtime'] });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOne({ 
      where: { id },
      relations: ['user', 'showtime']
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async create(createTicketDto: CreateTicketDto, userId: number): Promise<Ticket> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User với ID ${userId} không tồn tại`);

    const showtime = await this.showtimesRepository.findOne({ where: { id: createTicketDto.showtimeId } });
    if (!showtime) throw new NotFoundException(`Showtime với ID ${createTicketDto.showtimeId} không tồn tại`);

    const existingTicket = await this.ticketsRepository.findOne({ 
      where: { seatNumber: createTicketDto.seatNumber, showtime: { id: createTicketDto.showtimeId } } 
    });

    if (existingTicket) {
      throw new ForbiddenException(`Ghế ${createTicketDto.seatNumber} đã được đặt trước`);
    }

    const newTicket = this.ticketsRepository.create({
      ...createTicketDto,
      user,
      showtime,
    });

    return this.ticketsRepository.save(newTicket);
  }

  async update(id: number, updateTicketDto: UpdateTicketDto, userId: number): Promise<Ticket> {
    const ticket = await this.findOne(id);

    // ✅ Kiểm tra quyền cập nhật (chỉ chủ sở hữu vé)
    if (!ticket.user || ticket.user.id !== userId) {
      throw new ForbiddenException("You don't have permission to update this ticket");
    }

    await this.ticketsRepository.update(id, updateTicketDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    const ticket = await this.findOne(id);

    // ✅ Kiểm tra quyền xóa (chỉ chủ sở hữu vé)
    if (!ticket.user || ticket.user.id !== userId) {
      throw new ForbiddenException("You don't have permission to delete this ticket");
    }

    await this.ticketsRepository.remove(ticket);
  }
}
