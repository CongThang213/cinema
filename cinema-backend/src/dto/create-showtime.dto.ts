import { IsDateString, IsInt } from 'class-validator';

export class CreateShowtimeDto {
  @IsDateString()
  startTime: string;

  @IsInt()
  movieId: number;

  @IsInt()
  theaterId: number;
}
