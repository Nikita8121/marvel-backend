import { Delete, Get, Injectable, Put } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartModel } from './cart.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartModel) private readonly cartModel: ModelType<CartModel>,
  ) {}

  async create(dto: CreateCartDto) {
    return new this.cartModel(dto).save();
  }

  async get(id: string) {
    return this.cartModel
      .aggregate([
        {
          $match: { _id: id },
        },
        /* {
          $sort: {
            _id: 1,
          },
        }, */
        /* {
          $limit: 1,
        }, */
        /* {
          $lookup: {
            from: 'Comic',
            localField: 'items.comicId',
            foreignField: '_id',
            as: 'comics',
          },
        },
        {
          $addFields: {
            comics: '$comics',
          },
        }, */
      ])
      .exec();
  }

  async delete(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }
}
