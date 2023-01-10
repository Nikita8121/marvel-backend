import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoFilter } from './exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new MongoFilter());
  await app.listen(3000);
}
bootstrap();
