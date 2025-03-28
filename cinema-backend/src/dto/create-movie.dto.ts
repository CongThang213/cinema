import { IsNotEmpty, IsString, IsNumber, IsInt, IsOptional } from 'class-validator';
import { IsEnum } from 'class-validator';

export enum Genre {
  ACTION = 'Action',
  DRAMA = 'Drama',
  COMEDY = 'Comedy',
  HORROR = 'Horror',
  SCI_FI = 'Sci-Fi',
}

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsEnum(Genre, { message: 'Invalid genre' }) // Kiểm tra giá trị hợp lệ
  genre: Genre;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  posterUrl?: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Duration must be a valid number' })
  @IsInt({ message: 'Duration must be an integer' }) // Chỉ chấp nhận số nguyên
  duration: number;
  
}
