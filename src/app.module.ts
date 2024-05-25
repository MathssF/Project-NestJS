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
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_GUARD, HttpAdapterHost } from '@nestjs/core';
import { User } from './user/entities/user.entity';
import { Genre } from './movie/entities/genres.entity';
import { Movie } from './movie/entities/movies.entity';
import { MovieGenre } from './movie/entities/movie-genre.entity';
import { Rating } from './user/entities/rating.entity';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true, // torna as configurações globais
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'MKSdatabase',
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      entities: [User, Genre, Movie, MovieGenre, Rating],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    MovieModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  configure() {
    // const app = this.httpAdapterHost.httpAdapter.getInstance();
    // const config = new DocumentBuilder()
    //   .setTitle('Movies Database')
    //   .setDescription('Uma API que passa informação sobre uma lista de filmes usando o JWT')
    //   .setVersion('1.0')
    //   .addTag('Movies')
    //   .addTag('Database. postgres')
    //   .addTag('NestJG')
    //   .addTag('JWT')
    //   .addTag('MKS')
    //   .build();
    // const document = SwaggerModule.createDocument(app, config);
    // SwaggerModule.setup('api', app, document);
  }
}
