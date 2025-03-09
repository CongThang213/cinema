import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Showtime } from '../entities/showtimes/showtime';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime)
    private showtimesRepository: Repository<Showtime>,
  ) {}

  findAll(): Promise<Showtime[]> {
    return this.showtimesRepository.find();
  }

  findOne(id: number): Promise<Showtime> {
    return this.showtimesRepository.findOne({ where: { id } });
  }

  create(showtime: Showtime): Promise<Showtime> {
    return this.showtimesRepository.save(showtime);
  }

  async update(id: number, showtime: Showtime): Promise<Showtime> {
    await this.showtimesRepository.update(id, showtime);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.showtimesRepository.delete(id);
  }
}
