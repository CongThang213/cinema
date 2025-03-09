import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheatersService } from './theaters.service';
import { TheatersController } from './theaters.controller';
import { Theater } from '../entities/theaters/theater';

@Module({
  imports: [TypeOrmModule.forFeature([Theater])],
  controllers: [TheatersController],
  providers: [TheatersService],
})
export class TheatersModule {}
