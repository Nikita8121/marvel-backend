import { IsNumber, IsString } from 'class-validator';

export class AddItemDto {
  @IsString()
  comicId: string;
  @IsNumber()
  price: number;
}
