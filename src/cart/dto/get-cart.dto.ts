import { CreateComicDto } from 'src/comic/dto/create-comic.dto';

class ItemDTO {
  comicId: string;
  quantity: number;
  price: number;
  item: CreateComicDto;
}

export class GetCartDTO {
  userId: string;
  totalPrice: number;
  items: ItemDTO[];
}
