import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

enum Payment {
  Cash = 'Cash',
  CreditCard = 'CreditCard',
}

class ItemDto {
  @IsString()
  comicId: string;
  @IsNumber()
  quantity: number;
  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsString()
  name: string;
  @IsString()
  secondName: string;
  @IsString()
  city: string;
  @IsString()
  street: string;
  @IsEnum(Payment)
  payment: Payment;
  @IsArray()
  @ValidateNested()
  @Type(() => ItemDto)
  items: ItemDto[];
  @IsNumber()
  totalPrice: number;
}
