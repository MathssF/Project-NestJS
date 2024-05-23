import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { SeedModule } from './seed/seed.module';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpAdapterHost } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // torna as configurações globais
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'MKSdatabase',
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule, UserModule, MovieModule, SeedModule, RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RedisService,
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  configure() {
    const app = this.httpAdapterHost.httpAdapter.getInstance();
    const config = new DocumentBuilder()
      .setTitle('Nome da sua API')
      .setDescription('Descrição da sua API')
      .setVersion('1.0')
      .addTag('nome_da_tag')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
