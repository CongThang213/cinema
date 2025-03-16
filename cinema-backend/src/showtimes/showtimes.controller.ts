import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { Showtime } from '../entities/showtimes/showtime';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Get()
  findAll(): Promise<Showtime[]> {
    return this.showtimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Showtime | null> {
    return this.showtimesService.findOne(id);
  }

  @Post()
  create(@Body() showtime: Showtime): Promise<Showtime> {
    return this.showtimesService.create(showtime);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() showtime: Showtime): Promise<Showtime | null> {
    return this.showtimesService.update(id, showtime);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.showtimesService.remove(id);
  }
}
