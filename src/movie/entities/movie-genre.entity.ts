import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movies.entity';
import { Genre } from './genres.entity';

@Entity()
export class MovieGenre {
  @PrimaryColumn()
  movieId: number;

  @PrimaryColumn()
  genreId: number;

  @ManyToOne(() => Movie, (movie) => movie.genres, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'id' })
  movie: Movie;

  @ManyToOne(() => Genre, (genre) => genre.movies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'genre_id', referencedColumnName: 'id' })
  genre: Genre;
}
