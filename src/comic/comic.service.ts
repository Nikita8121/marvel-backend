import { Injectable } from '@nestjs/common';
import { CreateComicDto } from './dto/create-comic.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ComicModel } from './comic.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class ComicService {
  constructor(
    @InjectModel(ComicModel) private readonly comicModel: ModelType<ComicModel>,
  ) {}
  async create(dto: CreateComicDto) {
    const newComic = new this.comicModel(dto);
    return newComic.save();
  }

  async get(offsetParam: string, limitParam: string) {
    const total = await this.comicModel.count().exec();
    const limit = limitParam ? parseInt(limitParam) : 9;
    const offset = offsetParam ? parseInt(offsetParam) : 0;
    return {
      total,
      offset,
      limit,
      results: await this.comicModel.aggregate([
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $skip: offset,
        },
        {
          $limit: limit,
        },
      ]),
    };
  }

  async getById(id: string) {
    return this.comicModel.findById(id);
  }
}
