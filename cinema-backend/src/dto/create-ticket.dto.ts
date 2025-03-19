import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  seatNumber: string;

  @IsNotEmpty()
  @IsNumber()
  showtimeId: number; // Chỉ truyền ID của Showtime, không truyền object
}
