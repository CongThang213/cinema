import { IsNotEmpty, IsDate, IsInt } from 'class-validator';

export class CreateShowtimeDto {
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @IsNotEmpty()
  @IsInt()
  movieId: number;

  @IsNotEmpty()
  @IsInt()
  theaterId: number;
}
