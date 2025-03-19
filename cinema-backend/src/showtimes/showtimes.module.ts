import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import { Showtime } from '../entities/showtimes/showtime';
import { AuthModule } from 'src/auth/auth.module';
import { MoviesModule } from 'src/movies/movies.module';
import { Movie } from 'src/entities/movies/movie';
import { TheatersModule } from 'src/theaters/theaters.module';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { IsAdminMiddleware } from 'src/common/middleware/is-admin.middleware';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Showtime]), AuthModule, MoviesModule, TheatersModule],
  controllers: [ShowtimesController],
  providers: [ShowtimesService],
})
export class ShowtimesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, IsAdminMiddleware) // Kiểm tra Auth & quyền Admin
      .forRoutes('showtimes'); // Áp dụng cho API /showtimes
  }
}{}
