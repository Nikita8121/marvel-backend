import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CharacterModel } from './character.model';
import { CreateCharacterDto } from './dto/create-character.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(CharacterModel)
    private readonly characterModel: ModelType<CharacterModel>,
  ) {}

  async create(dto: CreateCharacterDto) {
    const newCharacter = new this.characterModel(dto);
    return newCharacter.save();
  }

  async get(offsetParam: string, limitParam: string) {
    const total = await this.characterModel.count().exec();
    const limit = limitParam ? parseInt(limitParam) : 9;
    const offset = offsetParam ? parseInt(offsetParam) : 0;
    return {
      total,
      offset,
      limit,
      results: await this.characterModel.aggregate([
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

  async getById(id: string): Promise<CharacterModel> {
    return this.characterModel.findById(id);
  }

  async getRandom(): Promise<CharacterModel> {
    const total = await this.characterModel.count().exec();
    const min = Math.ceil(0);
    const max = Math.floor(total);
    const randomIndex = Math.floor(Math.random() * (max - min) + min);
    return this.characterModel
      .aggregate([
        {
          $skip: randomIndex - 1,
        },
        {
          $limit: 1,
        },
      ])
      .exec()
      .then((item) => item[0]);
  }
}
