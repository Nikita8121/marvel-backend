import { JwtHelperModule } from './utils/jwtHelper/jwthelper.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { AuthModule } from './auth/auth.module';
import { ComicModule } from './comic/comic.module';
import { CharacterModule } from './character/character.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    JwtHelperModule,
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    ComicModule,
    CharacterModule,
    CartModule,
    OrderModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
