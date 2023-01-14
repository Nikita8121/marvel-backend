import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class ItemDto {
  @IsString()
  comicId: string;
  @IsNumber()
  quantity: number;
  @IsNumber()
  price: number;
}

export class CreateCartDto {
  @IsArray()
  @ValidateNested()
  @Type(() => ItemDto)
  items: ItemDto[];
  @IsString()
  userId: string;
  @IsNumber()
  totalPrice: number;
}

