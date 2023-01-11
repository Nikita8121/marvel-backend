import { IsNumber, IsString } from 'class-validator';

export class CreateComicDto {
  @IsString()
  title: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  price: string;

  @IsString()
  description: string;

  @IsNumber()
  pageCount: number;
}
