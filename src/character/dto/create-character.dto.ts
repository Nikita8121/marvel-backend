import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class ComicItemDto {
  @IsString()
  resourceURI: string;
  @IsString()
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
  @ValidateNested({ each: true })
  @Type(() => ComicItemDto)
  comics: ComicItemDto[];
}
