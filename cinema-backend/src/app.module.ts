import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';
import { TheatersModule } from './theaters/theaters.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { TicketsModule } from './tickets/tickets.module';
import { PaymentModule } from './payment/payment.module';

import { DatabaseModule } from './database/database.module';

import { User } from './entities/user/user';
import { Movie } from './entities/movies/movie';
import { Theater } from './entities/theaters/theater';
import { Showtime } from './entities/showtimes/showtime';
import { Ticket } from './entities/tickets/tickets';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'cinema_db',
      autoLoadEntities: true, // Tự động load tất cả entity
      synchronize: true, // Chỉ dùng khi phát triển, KHÔNG dùng cho production
    }),
    TypeOrmModule.forFeature([User, Movie, Theater, Showtime, Ticket]),
    
    // Các module của hệ thống
    AuthModule,
    UserModule,
    MoviesModule,
    TheatersModule,
    ShowtimesModule,
    TicketsModule,
    PaymentModule,
    DatabaseModule,

    // Cấu hình Redis Cache
    CacheModule.register({
      isGlobal: true,
      store: 'ioredis',
      host: 'localhost',
      port: 6379,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Áp dụng middleware cho tất cả route
  }
}
