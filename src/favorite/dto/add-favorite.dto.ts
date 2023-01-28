import { IsString } from 'class-validator';

export class AddFavorite {
  @IsString()
  comicId: string;
}
