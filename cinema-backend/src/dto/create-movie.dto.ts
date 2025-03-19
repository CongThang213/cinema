import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number; // Thời lượng phim (phút)

  @IsNotEmpty()
  @IsString()
  director: string;
}
