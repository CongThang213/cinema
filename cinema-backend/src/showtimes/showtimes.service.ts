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
    return this.showtimesRepository.find({ relations: ['movie', 'theater'] });
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
    const { movieId, theaterId, startTime } = createShowtimeDto;

    const movie = await this.moviesRepository.findOne({ where: { id: movieId } });
    if (!movie) throw new NotFoundException(`Movie with ID ${movieId} not found`);

    const theater = await this.theatersRepository.findOne({ where: { id: theaterId } });
    if (!theater) throw new NotFoundException(`Theater with ID ${theaterId} not found`);

    const newShowtime = this.showtimesRepository.create({
      startTime: new Date(startTime),
      movie,
      theater,
    });

    return this.showtimesRepository.save(newShowtime);
  }

  // ✅ Cập nhật thông tin lịch chiếu
  async update(id: number, updateShowtimeDto: UpdateShowtimeDto): Promise<Showtime> {
    const showtime = await this.findOne(id);

    const { movieId, theaterId, startTime } = updateShowtimeDto;

    if (movieId) {
      const movie = await this.moviesRepository.findOne({ where: { id: movieId } });
      if (!movie) throw new NotFoundException(`Movie with ID ${movieId} not found`);
      showtime.movie = movie;
    }

    if (theaterId) {
      const theater = await this.theatersRepository.findOne({ where: { id: theaterId } });
      if (!theater) throw new NotFoundException(`Theater with ID ${theaterId} not found`);
      showtime.theater = theater;
    }

    if (startTime) {
      showtime.startTime = new Date(startTime);
    }

    return this.showtimesRepository.save(showtime);
  }

  // ✅ Xóa một lịch chiếu theo ID
  async remove(id: number): Promise<void> {
    const showtime = await this.findOne(id);
    if (!showtime) throw new NotFoundException(`Showtime with ID ${id} not found`);

    await this.showtimesRepository.remove(showtime);
  }
}
