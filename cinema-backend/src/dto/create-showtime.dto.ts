import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateShowtimeDto {
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @IsNotEmpty()
  @IsNumber()
  movieId: number;

  @IsNotEmpty()
  @IsNumber()
  theaterId: number;
}
