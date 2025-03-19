import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theater } from '../entities/theaters/theater';
import { CreateTheaterDto } from 'src/dto/create-theater.dto';
import { UpdateTheaterDto } from 'src/dto/update-theater.dto';

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

  create(createTheaterDto: CreateTheaterDto): Promise<Theater> {
    const newTheater = this.theatersRepository.create(createTheaterDto);
    return this.theatersRepository.save(newTheater);
  }

  async update(id: number, updateTheaterDto: UpdateTheaterDto): Promise<Theater | null> {
    await this.theatersRepository.update(id, updateTheaterDto);
    return this.theatersRepository.findOne({ where: { id } });
  }
  
  async remove(id: number): Promise<void> {
    await this.theatersRepository.delete(id);
  }
}
