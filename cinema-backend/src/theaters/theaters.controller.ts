import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { Theater } from '../entities/theaters/theater';

@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Get()
  findAll(): Promise<Theater[]> {
    return this.theatersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Theater> {
    return this.theatersService.findOne(id);
  }

  @Post()
  create(@Body() theater: Theater): Promise<Theater> {
    return this.theatersService.create(theater);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() theater: Theater): Promise<Theater> {
    return this.theatersService.update(id, theater);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.theatersService.remove(id);
  }
}
