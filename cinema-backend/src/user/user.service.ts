import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user/user';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserRole } from '../entities/user/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto, defaultRole: UserRole = UserRole.USER): Promise<User> {
    const existingUser = await this.userRepository.findOne({ 
      where: [{ email: userData.email }, { username: userData.username }]
    });
    
    if (existingUser) {
        throw new ConflictException('Email hoặc username đã tồn tại!');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role: userData.role || defaultRole,
    });

    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['tickets'] });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['tickets'] });
    if (!user) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }
    return user;
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    await this.userRepository.update(id, userData);
    return this.getUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    await this.userRepository.delete(id);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }
}
