import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Req,
  Headers,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { UserId } from 'src/decorators/user.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('add')
  async add(@Body() dto: AddItemDto, @UserId() userId: string) {
    return this.cartService.add(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async get(@UserId() userId: string) {
    return this.cartService.get(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cartService.delete(id);
  }
}
