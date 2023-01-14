import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export class CartItem {
  @prop()
  comicId: string;
  @prop()
  quantity: number;
  @prop()
  price: number;
}

export interface CartModel extends Base {}
export class CartModel extends TimeStamps {
  @prop({ type: () => [CartItem], _id: false })
  items: CartItem[];
  @prop({ unique: true })
  userId: string;
  @prop()
  totalPrice: number;
}
