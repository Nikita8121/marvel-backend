import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class ComicItemDto {
  resourceURI: string;
  name: string;
}

export class CreateCharacterDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  thumbnail: string;
  @IsString()
  homepage: string;
  @IsString()
  wiki: string;
  @Type(() => ComicItemDto)
  comics: ComicItemDto[];
}
