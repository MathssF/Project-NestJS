import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { SeedModule } from './seed/seed.module';
import { APP_GUARD } from '@nestjs/core';
import { User } from './user/entities/user.entity';
import { Genre } from './movie/entities/genres.entity';
import { Movie } from './movie/entities/movies.entity';
import { MovieGenre } from './movie/entities/movie-genre.entity';
import { Rating } from './user/entities/rating.entity';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      database: 'MKSdatabase',
      username: process.env.DB_USERNAME,
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
export class AppModule {}
