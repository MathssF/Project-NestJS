import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Genre } from './entities/genres.entity';
import { Movie } from './entities/movies.entity';
import { MovieGenre } from './entities/movie-genre.entity';
import { Rating } from 'src/user/entities/rating.entity';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, Genre, Movie, MovieGenre, Rating,
  ]),
  CacheModule.register({
    // store: redisStore,
    max: 100,
    ttl: 3600,
    host: 'localhost',
    port: 6379,
  }),
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
  ],
})
export class MovieModule {}
