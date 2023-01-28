import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Injectable } from '@nestjs/common';

export interface FavoriteModel extends Base {}

export class FavoriteModel extends TimeStamps {
  @prop({ unique: true })
  userId: string;
  @prop({ type: () => [String] })
  comicId: string[];
}
