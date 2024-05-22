import { EntityRepository, Repository } from 'typeorm';
import { MovieGenre } from './movie-genre.entity';

@EntityRepository(MovieGenre)
export class MovieGenreRepository extends Repository<MovieGenre> {
  // 
}