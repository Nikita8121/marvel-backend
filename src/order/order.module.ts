import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtHelperModule } from 'src/utils/jwtHelper/jwthelper.module';
import { OrderModel } from './order.model';

@Module({
  imports: [
    JwtHelperModule,
    TypegooseModule.forFeature([
      {
        typegooseClass: OrderModel,
        schemaOptions: {
          collection: 'Order',
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
