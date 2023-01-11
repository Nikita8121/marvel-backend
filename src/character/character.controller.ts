import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(dto: CreateCharacterDto) {
    return this.characterService.create(dto);
  }
}
