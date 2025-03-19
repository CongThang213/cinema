import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
    role: string;  // Định nghĩa thuộc tính role
  }  

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bạn chưa đăng nhập!');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as any;// Giải mã JWT
      req.user = decoded as UserPayload;; // Lưu user vào request
      next();
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn!');
    }
  }
}
