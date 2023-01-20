import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ComicService } from './comic.service';
import { CreateComicDto } from './dto/create-comic.dto';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateComicDto) {
    return this.comicService.create(dto);
  }

  /* @Post('createArray')
  async createArray(@Body() dto: any) {
    dto.data.forEach(async (el) => {
      this.comicService.create(el);
    });
  } */

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.comicService.getById(id);
  }

  @Get()
  async get(@Query('offset') offset: string, @Query('limit') limit: string) {
    return this.comicService.get(offset, limit);
  }
}
