import { Delete, Get, Injectable, Put } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { CartModel } from './cart.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { JwtHelperService } from 'src/utils/jwtHelper/jwthelper.service';
import { GetCartDTO } from './dto/get-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartModel) private readonly cartModel: ModelType<CartModel>,
    private readonly jwtHelperService: JwtHelperService,
  ) {}

  async add(dto: AddItemDto, userId: string) {
    (dto as AddItemDto & { userId: string }).userId = userId;
    return new this.cartModel(dto).save();
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

  async delete(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }
}
