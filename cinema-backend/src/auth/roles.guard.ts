import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SetMetadata } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("Bạn chưa đăng nhập!");
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException("Bạn không có quyền truy cập!");
    }

    return true;
  }
}

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
