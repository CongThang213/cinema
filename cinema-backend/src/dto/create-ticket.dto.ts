import { IsNotEmpty, IsInt, IsString, Min, IsOptional } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  seatNumber: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0, { message: 'Price must be at least 0' })
  price: number;

  @IsNotEmpty()
  @IsInt()
  showtimeId: number;

  @IsOptional()
  @IsInt()
  userId?: number; // Có thể không có user nếu chưa đặt
}
