import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTheaterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  totalScreens: number;
}
