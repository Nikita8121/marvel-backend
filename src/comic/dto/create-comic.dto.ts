import { IsNumber, IsString } from 'class-validator';

export class CreateComicDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  price: string;

  @IsNumber()
  pageCount: number;
}
