import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Injectable } from '@nestjs/common';

export interface ComicModel extends Base {}

@Injectable()
export class ComicModel extends TimeStamps {
  @prop({ unique: true })
  title: string;

  @prop()
  thumbnail: string;

  @prop()
  price: string;

  @prop()
  description: string;

  @prop()
  pageCount: number;
}
