import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user.decorator';
import { RemoveItemDto } from './dto/remove-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('')
  async addItem(@Body() dto: AddItemDto, @UserId() userId: string) {
    return this.cartService.addItem(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Delete('removeItem')
  async removeItem(@Body() dto: RemoveItemDto, @UserId() userId: string) {
    return this.cartService.removeItem(dto.comicId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async get(@UserId() userId: string) {
    return this.cartService.get(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async delete(@UserId() userId: string) {
    return this.cartService.delete(userId);
  }
}
