import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Showtime } from 'src/entities/showtimes/showtime';
import { CreateShowtimeDto } from 'src/dto/create-showtime.dto';
import { UpdateShowtimeDto } from 'src/dto/update-showtime.dto';
import { Movie } from 'src/entities/movies/movie';
import { Theater } from 'src/entities/theaters/theater';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimesRepository: Repository<Showtime>,
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(Theater)
    private readonly theatersRepository: Repository<Theater>,
  ) {}

  // ✅ Lấy danh sách tất cả lịch chiếu
  async findAll(): Promise<Showtime[]> {
    return await this.showtimesRepository.find({ relations: ['movie', 'theater'] });
  }

  // ✅ Lấy thông tin lịch chiếu theo ID
  async findOne(id: number): Promise<Showtime> {
    const showtime = await this.showtimesRepository.findOne({
      where: { id },
      relations: ['movie', 'theater'],
    });
    if (!showtime) {
      throw new NotFoundException(`Showtime with ID ${id} not found`);
    }
    return showtime;
  }

  // ✅ Thêm một lịch chiếu mới
  async create(createShowtimeDto: CreateShowtimeDto): Promise<Showtime> {
    const movie = await this.moviesRepository.findOne({ where: { id: createShowtimeDto.movieId } });
    if (!movie) throw new NotFoundException(`Movie with ID ${createShowtimeDto.movieId} not found`);
  
    const theater = await this.theatersRepository.findOne({ where: { id: createShowtimeDto.theaterId } });
    if (!theater) throw new NotFoundException(`Theater with ID ${createShowtimeDto.theaterId} not found`);
  
    const newShowtime = this.showtimesRepository.create({
      startTime: new Date(createShowtimeDto.startTime), // Ép kiểu về Date
      movie: movie,
      theater: theater,
    });
  
    return await this.showtimesRepository.save(newShowtime);
  }
  

  // ✅ Cập nhật thông tin lịch chiếu
  async update(id: number, updateShowtimeDto: UpdateShowtimeDto): Promise<Showtime> {
    const showtime = await this.findOne(id);

    if (updateShowtimeDto.movieId) {
      const movie = await this.moviesRepository.findOne({ where: { id: updateShowtimeDto.movieId } });
      if (!movie) throw new NotFoundException(`Movie with ID ${updateShowtimeDto.movieId} not found`);
      showtime.movie = movie;
    }

    if (updateShowtimeDto.theaterId) {
      const theater = await this.theatersRepository.findOne({ where: { id: updateShowtimeDto.theaterId } });
      if (!theater) throw new NotFoundException(`Theater with ID ${updateShowtimeDto.theaterId} not found`);
      showtime.theater = theater;
    }

    if (updateShowtimeDto.startTime) {
      showtime.startTime = new Date(updateShowtimeDto.startTime);
    }
    

    return await this.showtimesRepository.save(showtime);
  }

  // ✅ Xóa một lịch chiếu theo ID
  async remove(id: number): Promise<void> {
    const showtime = await this.findOne(id);
    await this.showtimesRepository.remove(showtime);
  }
}
