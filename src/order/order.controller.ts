import { Body, Controller, Post, Headers } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { JwtHelperService } from 'src/utils/jwtHelper/jwthelper.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async create(
    @Headers('authorization') authorizationHeader: string,
    @Body() dto: CreateOrderDto,
  ) {
    return this.orderService.create(dto, authorizationHeader);
  }
}
