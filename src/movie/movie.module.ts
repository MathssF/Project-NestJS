import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Genre } from './entities/genres.entity';
import { Movie } from './entities/movies.entity';
import { MovieGenre } from './entities/movie-genre.entity';
import { Rating } from 'src/user/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, Genre, Movie, MovieGenre, Rating,
  ])],
  controllers: [MovieController],
  providers: [
    MovieService,
  ],
})
export class MovieModule {}
