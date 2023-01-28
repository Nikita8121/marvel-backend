import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FavoriteService } from './favorite.service';
import { AddFavorite } from './dto/add-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async add(
    @Headers('authorization') authorization: string,
    @Body() dto: AddFavorite,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async get() {}

  @UseGuards(JwtAuthGuard)
  @Delete(':comicId')
  async delete(@Param('comicId') id: string) {}
}
