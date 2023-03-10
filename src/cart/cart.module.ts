import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CartModel } from './cart.model';
import { JwtHelperModule } from 'src/utils/jwtHelper/jwthelper.module';

@Module({
  imports: [
    JwtHelperModule,
    TypegooseModule.forFeature([
      {
        typegooseClass: CartModel,
        schemaOptions: {
          collection: 'Cart',
        },
      },
    ]),
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
