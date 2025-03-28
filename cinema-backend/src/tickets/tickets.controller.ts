import { 
  Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards 
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from 'src/entities/tickets/tickets';
import { CreateTicketDto } from 'src/dto/create-ticket.dto';
import { UpdateTicketDto } from 'src/dto/update-ticket.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto, @Req() req: AuthenticatedRequest): Promise<Ticket> {
    if (!req.user?.id) {
      throw new Error('User not authenticated');
    }
    return this.ticketsService.create(createTicketDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTicketDto: UpdateTicketDto,
    @Req() req: AuthenticatedRequest
  ): Promise<Ticket> {
    if (!req.user?.id) {
      throw new Error('User not authenticated');
    }
    return this.ticketsService.update(Number(id), updateTicketDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest): Promise<void> {
    if (!req.user?.id) {
      throw new Error('User not authenticated');
    }
    return this.ticketsService.remove(Number(id), req.user.id);
  }
}
