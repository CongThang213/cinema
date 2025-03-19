import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateTicketDto {
  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  seatNumber?: string;

  @IsOptional()
  @IsNumber()
  showtimeId?: number;
}
