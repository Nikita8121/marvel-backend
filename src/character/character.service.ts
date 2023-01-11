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
}
