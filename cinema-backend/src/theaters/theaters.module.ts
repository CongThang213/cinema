import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheatersService } from './theaters.service';
import { TheatersController } from './theaters.controller';
import { Theater } from '../entities/theaters/theater';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/roles.guard';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { IsAdminMiddleware } from 'src/common/middleware/is-admin.middleware';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Theater]), AuthModule],
  controllers: [TheatersController],
  providers: [
    TheatersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [TypeOrmModule]
})
export class TheatersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, IsAdminMiddleware) // Kiểm tra Auth & quyền Admin
      .forRoutes('theaters'); // Áp dụng cho API /theaters
  }
}