import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '../entities/movies/movie';
import { CreateMovieDto } from 'src/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/dto/update-movie.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { Query } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';


@Controller('admin/movies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // Lấy chi tiết một phim
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie | null> {
    return this.moviesService.findOne(Number(id));
  }

  @Get()
  @Roles("admin") // Chỉ Admin mới gọi được API này
  async getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  // Lấy danh sách phim với Pagination
  @Get()
  async getMovies(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.moviesService.getMovies(Number(page), Number(limit));
  }

  // Chỉ Admin mới được thêm phim
  @Post()
  @UseGuards(AdminGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() createMovieDto: CreateMovieDto) {
    const newMovie = await this.moviesService.create(createMovieDto);
    return { message: 'Thêm phim thành công!', data: newMovie };
  }

  // Chỉ Admin mới được cập nhật phim
  @Put(':id')
  @UseGuards(AdminGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    const updatedMovie = await this.moviesService.update(Number(id), updateMovieDto);
    return { message: 'Cập nhật phim thành công!', data: updatedMovie };
  }

  // Chỉ Admin mới được xóa phim
  @Delete(':id')
  @UseGuards(AdminGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    await this.moviesService.remove(Number(id));
    return { message: 'Xóa phim thành công!' };
  }
}