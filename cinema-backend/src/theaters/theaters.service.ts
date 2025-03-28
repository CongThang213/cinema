import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theater } from '../entities/theaters/theater';
import { CreateTheaterDto } from 'src/dto/create-theater.dto';
import { UpdateTheaterDto } from 'src/dto/update-theater.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TheatersService {
  constructor(
    @InjectRepository(Theater)
    private theatersRepository: Repository<Theater>,
  ) {}

  findAll(page: number = 1, limit: number = 10, search?: string): Promise<{ data: Theater[], total: number }> { //pagination (phân trang) và filtering (lọc dữ liệu)
    const query = this.theatersRepository.createQueryBuilder('theater');
  
    if (search) {
      query.where("theater.name ILIKE :search", { search: `%${search}%` });
    }
  
    query.skip((page - 1) * limit).take(limit);
  
    return query.getManyAndCount().then(([data, total]) => ({ data, total }));
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
    const theater = await this.theatersRepository.findOne({ where: { id } });
  
    if (!theater) {
      throw new NotFoundException(`Theater with ID ${id} not found`);
    }
  
    await this.theatersRepository.delete(id);
  }
  
}
