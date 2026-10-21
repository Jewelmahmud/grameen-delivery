import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppDataSource } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 3000;
  // Run DB migrations on startup
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  await app.listen(port);
}
bootstrap();


