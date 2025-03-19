import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.user && request.user.role === 'admin') {
      return true;
    }
    throw new ForbiddenException('Bạn không có quyền truy cập!');
  }
}
