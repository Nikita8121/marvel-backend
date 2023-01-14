import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { OrderModel } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtHelperService } from 'src/utils/jwtHelper/jwthelper.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>,
    private readonly jwtHelperService: JwtHelperService,
  ) {}

  async create(dto: CreateOrderDto, authHeader: string) {
    const newOrder = new this.orderModel(dto).save();
    console.log(await this.jwtHelperService.getJwtPayload(authHeader))
    if (authHeader) {
      const jwtPayload = await this.jwtHelperService.getJwtPayload(authHeader);
    }
    return newOrder;
  }
}
