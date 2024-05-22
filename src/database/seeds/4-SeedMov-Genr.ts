import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Genre } from 'src/movie/entities/genres.entity';
import { Movie } from 'src/movie/entities/movies.entity';
import { MovieGenre } from 'src/movie/entities/movie-genre.entity';

export class MovieInGenre implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      const relations = [
        { movie_id: 823464, genre_id: 878 },
        { movie_id: 823464, genre_id: 28 },
        { movie_id: 823464, genre_id: 12 },
        { movie_id: 653346, genre_id: 878 },
        { movie_id: 653346, genre_id: 12 },
        { movie_id: 653346, genre_id: 28 },
        { movie_id: 940721, genre_id: 878 },
        { movie_id: 940721, genre_id: 27 },
        { movie_id: 940721, genre_id: 28 },
        { movie_id: 1219685, genre_id: 18 },
        { movie_id: 1219685, genre_id: 10770 },
        { movie_id: 996154, genre_id: 28 },
        { movie_id: 996154, genre_id: 80 },
        { movie_id: 996154, genre_id: 9648 },
        { movie_id: 996154, genre_id: 53 },
        { movie_id: 1093995, genre_id: 28 },
        { movie_id: 1093995, genre_id: 80 },
        { movie_id: 1093995, genre_id: 9648 },
        { movie_id: 1093995, genre_id: 53 },
        { movie_id: 693134, genre_id: 878 },
        { movie_id: 693134, genre_id: 12 },
        { movie_id: 1011985, genre_id: 16},
        { movie_id: 1011985, genre_id: 28},
        { movie_id: 1011985, genre_id: 10751},
        { movie_id: 1011985, genre_id: 35},
        { movie_id: 1011985, genre_id: 14},
        { movie_id: 967847, genre_id: 14},
        { movie_id: 967847, genre_id: 12},
        { movie_id: 967847, genre_id: 35},
        { movie_id: 1094844, genre_id: 28},
        { movie_id: 1094844, genre_id: 878},
        { movie_id: 1111873, genre_id: 27},
        { movie_id: 1111873, genre_id: 53},
        { movie_id: 1096197, genre_id: 28},
        { movie_id: 1096197, genre_id: 27},
        { movie_id: 1096197, genre_id: 53},
        { movie_id: 843527, genre_id: 10749},
        { movie_id: 843527, genre_id: 35},
        { movie_id: 843527, genre_id: 18},
        { movie_id: 748783, genre_id: 16},
        { movie_id: 748783, genre_id: 35},
        { movie_id: 748783, genre_id: 10751},
        { movie_id: 920342, genre_id: 878},
        { movie_id: 119450, genre_id: 878},
        { movie_id: 119450, genre_id: 28},
        { movie_id: 119450, genre_id: 18},
        { movie_id: 119450, genre_id: 53},
        { movie_id: 1064178, genre_id: 28},
        { movie_id: 1064178, genre_id: 53},
        { movie_id: 1064178, genre_id: 27},
        { movie_id: 1147400, genre_id: 16},
        { movie_id: 1147400, genre_id: 12},
        { movie_id: 1147400, genre_id: 28},
        { movie_id: 1147400, genre_id: 14},
        { movie_id: 1147400, genre_id: 10751},
        { movie_id: 838209, genre_id: 9648},
        { movie_id: 838209, genre_id: 27},
        { movie_id: 838209, genre_id: 53},
        { movie_id: 934632, genre_id: 878},
        { movie_id: 934632, genre_id: 28},
        { movie_id: 934632, genre_id: 18}
    ];

    const movieGenreRepository = getRepository(MovieGenre);
    const genreRepository = getRepository(Genre);
    const movieRepository = getRepository(Movie);
    for (const relation of relations) {
      const movie = await movieRepository.findOne({
        where: {
          id: relation.movie_id
        }
      });
      const genre = await genreRepository.findOne({
        where: {
          id: relation.genre_id
        }
      });

      if (movie && genre) {
        await movieGenreRepository.save({
          movie: movie,
          genre: genre,
        });
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM movie_genre');
  }
}