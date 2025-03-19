import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movies/movie';
import { CreateMovieDto } from 'src/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/dto/update-movie.dto';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findOne(id: number): Promise<Movie | null> {
    return this.moviesRepository.findOne({ where: { id } });
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    return this.moviesRepository.save(movie);
  }
  
  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie | null> {
    await this.moviesRepository.update(id, updateMovieDto);
    return this.findOne(id);
  }
  

  async remove(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
  }

  async getMovies(page: number = 1, limit: number = 10) {
    const [movies, total] = await this.moviesRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: movies,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getAllMovies() {
    const cachedMovies = await this.cacheManager.get('movies');
    if (cachedMovies) {
      return cachedMovies; // Trả về dữ liệu từ cache nếu có
    }

    const movies = await this.moviesRepository.find(); // Lấy dữ liệu từ database
    await this.cacheManager.set('movies', movies, 300) // Lưu vào cache trong 5 phút

    return movies;
  }

}
