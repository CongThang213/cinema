import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { Showtime } from '../entities/showtimes/showtime';
import { CreateShowtimeDto } from 'src/dto/create-showtime.dto';
import { UpdateShowtimeDto } from 'src/dto/update-showtime.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('admin/showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Get()
  @UseGuards(JwtAuthGuard) // Người dùng đăng nhập có thể xem lịch chiếu
  findAll() {
    return this.showtimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Showtime | null> {
    return this.showtimesService.findOne(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  @Roles('admin') // Chỉ admin mới có thể tạo lịch chiếu mới
  create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return this.showtimesService.create(createShowtimeDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateShowtimeDto: UpdateShowtimeDto): Promise<Showtime | null> {
    return this.showtimesService.update(id, updateShowtimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.showtimesService.remove(id);
  }
}
