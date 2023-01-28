import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { Request } from 'express';
import { UserId } from 'src/decorators/user.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async create(@UserId() userId: string, @Body() dto: CreateOrderDto) {
    return this.orderService.create(dto, userId);
  }
}
