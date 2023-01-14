import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async create(@Req() req: Request, @Body() dto: CreateOrderDto) {
    console.log(req.headers?.authorization);
    return this.orderService.create(dto, req.headers?.authorization);
  }
}
