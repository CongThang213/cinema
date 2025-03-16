import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theater } from '../entities/theaters/theater';

@Injectable()
export class TheatersService {
  constructor(
    @InjectRepository(Theater)
    private theatersRepository: Repository<Theater>,
  ) {}

  findAll(): Promise<Theater[]> {
    return this.theatersRepository.find();
  }

  findOne(id: number): Promise<Theater | null> {
    return this.theatersRepository.findOne({ where: { id } });
  }

  create(theater: Theater): Promise<Theater> {
    return this.theatersRepository.save(theater);
  }

  async update(id: number, theater: Theater): Promise<Theater | null> {
    await this.theatersRepository.update(id, theater);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.theatersRepository.delete(id);
  }
}
