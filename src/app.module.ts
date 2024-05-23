import {
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { SeedModule } from './seed/seed.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpAdapterHost } from '@nestjs/core';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // torna as configurações globais
    }),
    // CacheModule.registerAsync({
    //   useFactory: async () => ({
    //     store: redisStore as any, // Forçando o tipo para resolver o erro
    //     host: 'localhost',
    //     port: 6379,
    //   }),
    // }),
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
    AuthModule, UserModule, MovieModule, SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  configure() {
    const app = this.httpAdapterHost.httpAdapter.getInstance();
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
    SwaggerModule.setup('api', app, document);
  }
}
