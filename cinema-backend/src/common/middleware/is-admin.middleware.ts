import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface UserPayload {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  use(req: Request & { user?: UserPayload }, res: Response, next: NextFunction) {
    if (!req.user) {
      throw new ForbiddenException('Bạn không có quyền truy cập!');
    }

    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Bạn không có quyền truy cập!');
    }

    next(); // Nếu là admin thì tiếp tục xử lý request
  }
}
