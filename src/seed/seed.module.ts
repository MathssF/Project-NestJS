import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserRepository } from 'src/user/entities/user.repository';
// import { GenreRepository } from 'src/movie/entities/genres.repository';
// import { MovieRepository } from 'src/movie/entities/movies.repository';
// import { MovieGenreRepository } from 'src/movie/entities/movie-genre.repository';
// import { RatingRepository } from 'src/user/entities/rating.repository';
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
