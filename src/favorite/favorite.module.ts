import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtHelperModule } from 'src/utils/jwtHelper/jwthelper.module';
import { FavoriteModel } from './favorite.model';

@Module({
  imports: [
    JwtHelperModule,
    TypegooseModule.forFeature([
      {
        typegooseClass: FavoriteModel,
        schemaOptions: {
          collection: 'Favorite',
        },
      },
    ]),
  ],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
