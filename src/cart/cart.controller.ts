import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async get(@Req() req: Request) {
    return this.cartService.get(req.headers?.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cartService.delete(id);
  }
}
