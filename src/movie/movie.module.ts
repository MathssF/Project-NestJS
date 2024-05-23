import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { UserRepository } from 'src/user/entities/user.repository';
import { GenreRepository } from './entities/genres.repository';
import { MovieRepository } from './entities/movies.repository';
import { MovieGenreRepository } from './entities/movie-genre.repository';
import { RatingRepository } from 'src/user/entities/rating.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserRepository,
    GenreRepository,
    MovieRepository,
    MovieGenreRepository,
    RatingRepository,
    AuthModule,
  ]), // RedisModule,
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
    AuthService,
  ],
})
export class MovieModule {}
