import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'cinema_db',
      autoLoadEntities: true,
      synchronize: true, // Chỉ dùng khi phát triển, không dùng cho production
    }),
  ],
  exports: [TypeOrmModule], // Đảm bảo export TypeOrmModule
})
export class DatabaseModule {}
