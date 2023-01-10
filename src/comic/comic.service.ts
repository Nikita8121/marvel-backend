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
}
