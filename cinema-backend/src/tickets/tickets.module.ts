import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from 'src/entities/tickets/tickets';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { IsAdminMiddleware } from 'src/common/middleware/is-admin.middleware';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), AuthModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, IsAdminMiddleware) // Kiểm tra Auth & quyền Admin
      .forRoutes('tickets'); // Áp dụng cho API /tickets
  }
}
