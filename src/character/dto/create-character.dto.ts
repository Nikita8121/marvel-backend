import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

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
  @IsArray()
  @ValidateNested()
  @Type(() => ComicItemDto)
  comics: ComicItemDto[];
}
