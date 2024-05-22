import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/entities/user.repository';
import { GenreRepository } from 'src/movie/entities/genres.repository';
import { MovieRepository } from 'src/movie/entities/movies.repository';
import { MovieGenreRepository } from 'src/movie/entities/movie-genre.repository';
import { RatingRepository } from 'src/user/entities/rating.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserRepository,
    GenreRepository,
    MovieRepository,
    MovieGenreRepository,
    RatingRepository,
  ])],
  providers: [SeedService],
  controllers: [SeedController],
  exports: [SeedService],
})
export class SeedModule {}
