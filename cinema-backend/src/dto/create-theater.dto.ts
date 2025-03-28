import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateTheaterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  capacity: number;
}
