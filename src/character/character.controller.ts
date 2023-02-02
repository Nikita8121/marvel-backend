import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateCharacterDto) {
    return this.characterService.create(dto);
  }

  /* @Post('createArray')
  async createArray(@Body() dto: any) {
    console.log(dto.data);
    dto.data.forEach(async (el) => {
      this.characterService.create(el);
    });
  } */

  @Get()
  async get(@Query('offset') offset: string, @Query('limit') limit: string) {
    return this.characterService.get(offset, limit);
  }

  @Get('random')
  async getRandom() {
    return this.characterService.getRandom();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.characterService.getById(id);
  }
}
