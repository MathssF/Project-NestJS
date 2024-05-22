import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movies.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  // 
}