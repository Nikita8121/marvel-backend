import { Prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Injectable } from '@nestjs/common';

enum Payment {
  Cash = 'Cash',
  CreditCard = 'CreditCard',
}

class Item {
  @Prop()
  comicId: string;
  @Prop()
  quantity: number;
  @Prop()
  price: number;
}

export interface OrderModel extends Base {}

@Injectable()
export class OrderModel extends TimeStamps {
  @Prop()
  name: string;
  @Prop()
  secondName: string;
  @Prop()
  city: string;
  @Prop()
  street: string;
  @Prop({ enum: Payment })
  payment: Payment;
  @Prop({ type: () => [Item] })
  items: Item[];
  @Prop()
  totalPrice: number;
  @Prop({ required: false })
  userId: string;
}
