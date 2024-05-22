import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { UserRepository } from 'src/user/entities/user.repository';
import { GenreRepository } from './entities/genres.repository';
import { MovieRepository } from './entities/movies.repository';
import { MovieGenreRepository } from './entities/movie-genre.repository';
import { RatingRepository } from 'src/user/entities/rating.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserRepository,
    GenreRepository,
    MovieRepository,
    MovieGenreRepository,
    RatingRepository,
  ])],
  controllers: [MovieController],
  providers: [
    MovieService,
    // UserRepository,
    // GenreRepository,
    // MovieRepository,
    // MovieGenreRepository,
    // RatingRepository,
  ],
})
export class MovieModule {}
