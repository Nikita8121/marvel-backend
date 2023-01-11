import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ItemDto {
  @IsString()
  comicId: string;
  @IsNumber()
  quantity: number;
  @IsNumber()
  price: number;
}

export class CreateCartDto {
  @Type(() => ItemDto)
  items: ItemDto[];
  @IsString()
  userId: string;
  @IsNumber()
  totalPrice: number;
}

