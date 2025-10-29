import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('Brain Agriculture API')
    .setDescription('API para gerenciamento de produtores rurais e propriedades agrícolas')
    .setVersion('1.0')
    .addTag('produtores', 'Operações relacionadas aos produtores rurais')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  if (process.env.NODE_ENV !== 'production') {
    const dataSource = app.get(DataSource);
    await runSeeds(dataSource);
  }
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 API rodando em http://localhost:${port}/api`);
  console.log(`📚 Documentação Swagger disponível em http://localhost:${port}/api/docs`);
}
bootstrap();