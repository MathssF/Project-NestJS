import { EntityRepository, Repository } from 'typeorm';
import { Genre } from './genres.entity';

@EntityRepository(Genre)
export class GenreRepository extends Repository<Genre> {
  // 
}