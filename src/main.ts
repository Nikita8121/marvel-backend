import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoFilter } from './exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new MongoFilter());
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.enableCors(options);
  await app.listen(3000);
}
bootstrap();
