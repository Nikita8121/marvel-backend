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

export class AddItemDto {
  @ValidateNested()
  @Type(() => ItemDto)
  item: ItemDto;
}
