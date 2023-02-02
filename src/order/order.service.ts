import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { OrderModel } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtHelperService } from 'src/utils/jwtHelper/jwthelper.service';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>,
    private readonly jwtHelperService: JwtHelperService,
  ) {}

  async create(dto: CreateOrderDto, authorizationHeader: string) {
    if (authorizationHeader) {
      const payload = await this.jwtHelperService.getJwtPayload(
        authorizationHeader,
      );
      if (payload?.userId) {
        return new this.orderModel({ ...dto, userId: payload.userId }).save();
      } else {
        throw new HttpException('Unauthorized', 401);
      }
    }
    return new this.orderModel(dto).save();
  }
}
