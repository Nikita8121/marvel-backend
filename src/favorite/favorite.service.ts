import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { FavoriteModel } from './favorite.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AddFavorite } from './dto/add-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(FavoriteModel) favoriteModel: ModelType<FavoriteModel>,
  ) {}

  async add(dto: AddFavorite) {}
}
