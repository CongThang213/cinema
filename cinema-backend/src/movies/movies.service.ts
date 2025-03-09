import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movies/movie';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOne({ where: { id } });
  }

  create(movie: Movie): Promise<Movie> {
    return this.moviesRepository.save(movie);
  }

  async update(id: number, movie: Movie): Promise<Movie> {
    await this.moviesRepository.update(id, movie);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
  }
}
