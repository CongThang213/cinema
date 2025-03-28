import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from 'src/dto/create-showtime.dto';
import { UpdateShowtimeDto } from 'src/dto/update-showtime.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
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
  async findOne(@Param('id') id: number) {
    return await this.showtimesService.findOne(id);
  }

  @Post()
  @UseGuards(AdminGuard) // Chỉ Admin có quyền tạo lịch chiếu
  async create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return await this.showtimesService.create(createShowtimeDto);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id') id: number, @Body() updateShowtimeDto: UpdateShowtimeDto) {
    return await this.showtimesService.update(id, updateShowtimeDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: number) {
    return await this.showtimesService.remove(id);
  }
}
