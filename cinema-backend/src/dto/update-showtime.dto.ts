import { IsOptional, IsDateString, IsInt } from 'class-validator';

export class UpdateShowtimeDto {
  @IsOptional()
  @IsDateString()
  startTime?: string;  // Để đảm bảo dữ liệu nhận vào là chuỗi ISO 8601

  @IsOptional()
  @IsInt()
  movieId?: number;

  @IsOptional()
  @IsInt()
  theaterId?: number;
}
