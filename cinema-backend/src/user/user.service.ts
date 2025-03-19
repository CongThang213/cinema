import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // ✅ Tạo user (Mã hóa password, kiểm tra email trùng lặp)
  async createUser(userData: Partial<User>, defaultRole: string = 'user'): Promise<User> {
    if (!userData.password) {
      throw new Error('Password không được để trống!');
    }

    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new ConflictException('Email đã tồn tại!');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = this.userRepository.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || defaultRole,
    });

    return await this.userRepository.save(newUser);
  }

  // ✅ Lấy tất cả user
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['tickets'] });
  }

  // ✅ Lấy user theo ID
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['tickets'] });
    if (!user) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }
    return user;
  }

  // ✅ Tìm user theo Username
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  // ✅ Tìm user theo Email
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // ✅ Cập nhật user
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    await this.userRepository.update(id, userData);
    return this.getUserById(id);
  }

  // ✅ Xóa user
  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }
    await this.userRepository.delete(id);
  }
}
