import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movies Database')
    .setDescription('Uma API que passa informação sobre uma lista de filmes usando o JWT')
    .setVersion('1.0')
    .addTag('start')
    .addTag('Users')
    .addTag('Auth')
    .addTag('Movie')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.security = [{ bearerAuth: [] }];
  SwaggerModule.setup('api', app, document);


  await app.listen(parseInt(process.env.REDIS_PORT, 10), () => {
    console.log('Application is running on your cloud');
  });
}
bootstrap();
