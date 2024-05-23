import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movies Database')
    .setDescription('Uma API que passa informação sobre uma lista de filmes usando o JWT')
    .setVersion('1.0')
    .addTag('Movies')
    .addTag('Database. postgres')
    .addTag('NestJG')
    .addTag('JWT')
    .addTag('MKS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
