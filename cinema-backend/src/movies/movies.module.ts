import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from '../entities/movies/movie';
import { AuthModule } from 'src/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { IsAdminMiddleware } from 'src/common/middleware/is-admin.middleware';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), AuthModule, CacheModule.register()],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [TypeOrmModule]
})
export class MoviesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, IsAdminMiddleware) // Áp dụng 2 middleware
      .forRoutes('movies'); // Chỉ áp dụng cho API /movies
  }
}