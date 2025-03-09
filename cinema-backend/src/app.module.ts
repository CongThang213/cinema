import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { User } from './entities/user/user';
import { Movie } from './entities/movies/movie';
import { Cinema } from './entities/cinema/cinema';
import { Theater } from './entities/theaters/theater';
import { Showtime } from './entities/showtimes/showtime';
import { Ticket } from './entities/tickets/tickets';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';
import { TheatersModule } from './theaters/theaters.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { TicketsModule } from './tickets/tickets.module';

import { OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, MoviesModule, TheatersModule, ShowtimesModule, TicketsModule],
})

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
      synchronize: true, // Tự động tạo bảng từ entity, chỉ dùng khi phát triển
    }),
    TypeOrmModule.forFeature([User, Movie, Cinema, Theater, Showtime, Ticket]),
    UserModule, // Đăng ký entity cho Dependency Injection
  ],
})

export class AppModule {}
