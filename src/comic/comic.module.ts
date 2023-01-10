import { Module } from '@nestjs/common';
import { ComicController } from './comic.controller';
import { ComicService } from './comic.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ComicModel } from './comic.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ComicModel,
        schemaOptions: {
          collection: 'Comic',
        },
      },
    ]),
  ],
  controllers: [ComicController],
  providers: [ComicService],
})
export class ComicModule {}
