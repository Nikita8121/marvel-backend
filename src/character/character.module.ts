import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CharacterModel } from './character.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CharacterModel,
        schemaOptions: {
          collection: 'Character',
        },
      },
    ]),
  ],
  providers: [CharacterService],
  controllers: [CharacterController]
})
export class CharacterModule {}
