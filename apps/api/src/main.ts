import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { runSeeds } from './seeds';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();  
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  if (process.env.NODE_ENV !== 'production') {
    const dataSource = app.get(DataSource);
    await runSeeds(dataSource);
  }
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 API rodando em http://localhost:${port}/api`);
}
bootstrap();