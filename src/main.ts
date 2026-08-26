import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Auxilio Vial (Mecánicos en Línea)')
    .setDescription(
      'Documentación interactiva para la API de rescates viales, autenticación JWT y seguimiento GPS en tiempo real.',
    )
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`🚀 Aplicación corriendo en: http://localhost:3000`);
  console.log(`📄 Documentación de Swagger en: http://localhost:3000/api`);
}
bootstrap();