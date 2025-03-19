import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { Theater } from '../entities/theaters/theater';
import { CreateTheaterDto } from 'src/dto/create-theater.dto';
import { UpdateTheaterDto } from 'src/dto/update-theater.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('admin/theaters')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Get()
  @Roles("admin", "user") // Người dùng đăng nhập có thể xem danh sách rạp
  findAll() {
    return this.theatersService.findAll();
  }

  @Get(':id')
  @Roles("admin", "user")
  findOne(@Param('id') id: number): Promise<Theater | null> {
    return this.theatersService.findOne(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  @Roles('admin') // Chỉ admin mới có thể thêm rạp mới
  create(@Body() createTheaterDto: CreateTheaterDto) {
    return this.theatersService.create(createTheaterDto);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @Roles('admin') // Chỉ admin mới có thể cập nhật rạp mới
  update(@Param('id') id: number, @Body() updateTheaterDto: UpdateTheaterDto): Promise<Theater | null> {
    return this.theatersService.update(id, updateTheaterDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @Roles('admin') // Chỉ admin mới có thể xóa rạp 
  remove(@Param('id') id: number): Promise<void> {
    return this.theatersService.remove(id);
  }
}

