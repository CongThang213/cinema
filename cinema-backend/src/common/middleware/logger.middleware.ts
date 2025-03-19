import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || 'Unknown';
    const ip = req.ip;
    const start = Date.now(); // Bắt đầu tính thời gian xử lý

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start; // Tính thời gian xử lý
      this.logger.log(
        `[${method}] ${originalUrl} - ${statusCode} - ${duration}ms - ${userAgent} - IP: ${ip}`
      );
    });

    next();
  }
}
