import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export class IComicItem {
  @prop()
  resourceURI: string;
  @prop()
  name: string;
}

export interface CharacterModel extends Base {}

export class CharacterModel extends TimeStamps {
  @prop({ unique: true })
  name: string;

  @prop()
  description: string;
  @prop()
  thumbnail: string;
  @prop()
  homepage: string;
  @prop()
  wiki: string;
  @prop({ type: () => [IComicItem] })
  comics: IComicItem[];
}
