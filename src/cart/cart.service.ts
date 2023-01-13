import { Delete, Get, Injectable, Put } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartModel } from './cart.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';

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
          $match: { _id: new Types.ObjectId(id) },
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
        /* {
          $lookup: {
            from: 'User',
            localField: 'userId',
            foreignField: '_id',
            as: 'comics',
          },
        }, */
        /* {
          $addFields: {
            comics: { $push: '$comics' },
          },
        }, */
        /* {
          $unwind: '$comics',
          preserveNullAndEmptyArrays: true, 
        }, */
        /* {
          $lookup: {
            from: 'Comic',
            pipeline: [
              { */
        /* $match: { _id: new Types.ObjectId('63bd5e66cf4bc52a5a30ab41') }, */
        /*    $match: {
                  $expr: {
                    $map: {
                      input: 'items',
                      
                    }
                  }
                }
              },
            ],
            as: 'comics',
          },
        }, */
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
              {
                $replaceRoot: {
                  newRoot: { $mergeObjects: ['$$items', '$$ROOT'] },
                },
              },
            ],
            as: 'comics',
          },
        },
        {
          $group: {
            _id: '$_id',
            /*  items: { $push: '$items' }, */
            comics: { $push: '$comics' },
          },
        },
        /* {
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
