import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Genre } from 'src/movie/entities/genres.entity';
import { Movie } from 'src/movie/entities/movies.entity';
import { MovieGenre } from 'src/movie/entities/movie-genre.entity';
import { Rating } from 'src/user/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    // UserRepository,
    // GenreRepository,
    // MovieRepository,
    // MovieGenreRepository,
    // RatingRepository,
    User, Genre, Movie, MovieGenre, Rating
  ])],
  providers: [SeedService],
  controllers: [SeedController],
  exports: [SeedService],
})
export class SeedModule {}
