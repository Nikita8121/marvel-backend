import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelperService } from './jwthelper.service';
import { getJwtConfig } from 'src/configs/jwt.config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [],
  providers: [JwtHelperService],
  exports: [JwtHelperService],
})
export class JwtHelperModule {}
