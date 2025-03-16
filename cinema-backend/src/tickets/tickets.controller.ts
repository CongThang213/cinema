import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '../entities/tickets/tickets';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Ticket | null> {
    return this.ticketsService.findOne(id);
  }

  @Post()
  create(@Body() ticket: Ticket): Promise<Ticket> {
    return this.ticketsService.create(ticket);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() ticket: Ticket): Promise<Ticket | null> {
    return this.ticketsService.update(id, ticket);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ticketsService.remove(id);
  }
}
