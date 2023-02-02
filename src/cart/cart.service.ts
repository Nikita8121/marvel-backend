import { Injectable } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { CartItem, CartModel } from './cart.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GetCartDTO } from './dto/get-cart.dto';
import { RemoveItemDto } from './dto/remove-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartModel) private readonly cartModel: ModelType<CartModel>,
  ) {}

  async addItem(dto: AddItemDto, userId: string) {
    const cart = await this.cartModel.findOne({ userId });
    if (cart) {
      const index = this.findItemIndexInCart(cart.items, dto.comicId);
      if (index >= 0) {
        cart.items[index].quantity += 1;
      } else {
        const item: CartItem = {
          comicId: dto.comicId,
          quantity: 1,
          price: dto.price,
        };
        cart.items.push(item);
      }
      cart.totalPrice += dto.price;
      return cart.save();
    }
    const item: CartItem = {
      comicId: dto.comicId,
      quantity: 1,
      price: dto.price,
    };
    const newCart: Omit<CartModel, '_id' | 'id'> = {
      items: [item],
      userId,
      totalPrice: dto.price,
    };
    return new this.cartModel(newCart).save();
  }

  async removeItem(itemId: string, userId: string) {
    const cart = await this.cartModel.findOne({ userId });
    const index = this.findItemIndexInCart(cart.items, itemId);
    const item = cart.items[index];
    if (item.quantity === 1) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity -= 1;
    }
    cart.totalPrice -= item.price;
    return cart.save();
  }

  findItemIndexInCart(items: CartItem[], comicId: string): number {
    return items.findIndex((item) => item.comicId === comicId);
  }

  async get(userId: string): Promise<GetCartDTO> {
    return this.cartModel
      .aggregate([
        {
          $match: { userId: userId },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: 1,
        },
        { $unwind: '$items' },
        {
          $lookup: {
            from: 'Comic',
            let: {
              comicId: { $toObjectId: '$items.comicId' },
              items: '$items',
            },
            pipeline: [
              {
                $match: { $expr: { $eq: ['$_id', '$$comicId'] } },
              },
            ],
            as: 'items.item',
          },
        },
        { $unwind: '$items.item' },
        {
          $group: {
            _id: '$_id',
            userId: { $first: '$userId' },
            totalPrice: { $first: '$totalPrice' },
            items: { $push: '$items' },
          },
        },
      ])
      .exec()
      .then((items) => items[0]);
  }

  async delete(userId: string) {
    return this.cartModel.findOneAndDelete({ userId });
  }
}
