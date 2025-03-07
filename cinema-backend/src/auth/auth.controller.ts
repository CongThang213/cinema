import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);
    const token = await this.authService.login(user);
    return { token, user };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard) // Yêu cầu xác thực bằng JWT
  async getProfile(@Req() req) {
    return req.user; // Trả về thông tin user
  }
}
