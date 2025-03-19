import { 
  Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards 
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '../entities/tickets/tickets';
import { CreateTicketDto } from 'src/dto/create-ticket.dto';
import { UpdateTicketDto } from 'src/dto/update-ticket.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { id: number }; // Định nghĩa kiểu dữ liệu của user trong request
}

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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Req() req: AuthenticatedRequest): Promise<Ticket> {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.ticketsService.create(createTicketDto, userId);
  }

  @Put(':id')
  update(
    @Param('id') id: number, 
    @Body() updateTicketDto: UpdateTicketDto
  ): Promise<Ticket | null> {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ticketsService.remove(id);
  }
}
