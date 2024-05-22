import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movies.entity';
import { Genre } from './genres.entity';

@Entity()
export class MovieGenre {
  @PrimaryColumn()
  movieId: number;

  @PrimaryColumn()
  genreId: number;

  @ManyToOne(() => Movie, (movie) => movie.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @ManyToOne(() => Genre, (genre) => genre.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'genreId' })
  genre: Genre;
}
