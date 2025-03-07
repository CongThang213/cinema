import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user/user';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  @Post()
  createUser(@Body() userData: Partial<User>) {
    return this.userService.createUser(userData);
  }

  // Get all users
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // Get user by ID
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  // Update a user
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() userData: Partial<User>) {
    return this.userService.updateUser(id, userData);
  }

  // Delete a user
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

@UseGuards(JwtAuthGuard, RolesGuard)  // Bảo vệ tất cả API trong controller
export class UsersController {
    
    @Get()
    @Roles('admin')  // Chỉ admin mới gọi được API này
    getAllUsers() {
        return "Danh sách người dùng";
    }
}