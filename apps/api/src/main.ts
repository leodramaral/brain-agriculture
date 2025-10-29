import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { runSeeds } from './seeds';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();  
  app.setGlobalPrefix('api');
  
  if (process.env.NODE_ENV !== 'production') {
    const dataSource = app.get(DataSource);
    await runSeeds(dataSource);
  }
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 API rodando em http://localhost:${port}/api`);
}
bootstrap();