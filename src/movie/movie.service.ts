import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Genre } from './entities/genres.entity';
import { Movie } from './entities/movies.entity';
import { UserRepository } from 'src/user/entities/user.repository';
import { GenreRepository } from './entities/genres.repository';
import { MovieRepository } from './entities/movies.repository';
import { MovieGenreRepository } from './entities/movie-genre.repository';
import { RatingRepository } from 'src/user/entities/rating.repository';
import { RedisService } from 'src/redis/redis.service';

interface MovieR extends Movie {
  rating?: number; // Adicionando rating como opcional
}

interface CreateMoviePost {
  id?: number,
  name: string;
  description: string;
  release_date: string;
  genres: number[];
}

@Injectable()
export class MovieService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly genreRepository: GenreRepository,
    private readonly movieRepository: MovieRepository,
    private readonly movieGenreRepository: MovieGenreRepository,
    private readonly ratingRepository: RatingRepository,
    private readonly redisService: RedisService,
  ) {}
  async findGenres(): Promise<Genre[]> {
    const cacheKey = 'genres';
    const cachedGenres = await this.redisService.get(cacheKey);

    if(cachedGenres) {
      return JSON.parse(cachedGenres);
    }
    const listGenres = this.genreRepository.find();
    await this.redisService.set(cacheKey, JSON.stringify(listGenres), 3600);
    return listGenres;
  }

  async findGenresName(): Promise<string[]> {
    const cacheKey = 'genreNames';
    const cachedGenreNames = await this.redisService.get(cacheKey);

    if (cachedGenreNames) {
      return JSON.parse(cachedGenreNames);
    }
    const genres = await this.genreRepository.find();
    const listNames = genres.map(genre => genre.name);
    await this.redisService.set(cacheKey, JSON.stringify(listNames), 3600);
    return listNames;
  }
 
  async findAllMovies(): Promise<Movie[]> {
    const cacheKey = 'allMovies';
    const cachedMovies = await this.redisService.get(cacheKey);

    if (cachedMovies) {
      return JSON.parse(cachedMovies);
    }
    const listMovies = this.movieRepository.find();
    await this.redisService.set(cacheKey, JSON.stringify(listMovies), 3600);
    return listMovies;
  }

  async findMovieById(id: number): Promise<any> {
    const cacheKey = `theMovie:${id}`;
    const cachedMovie = await this.redisService.get(cacheKey);

    if (cachedMovie) {
      return JSON.parse(cachedMovie);
    }

    const movie = this.movieRepository.findOne({
        where: {
            id: id,
        }
    });
    if (!movie) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }
    // Buscar todas as avaliações relacionadas ao filme
    const ratings = await this.ratingRepository.find({
      where: { movieId: id },
    });

    if (ratings.length === 0) {
      await this.redisService.set(cacheKey, JSON.stringify(movie), 3600);
      return movie;
    }

    // Extrair os valores de avaliação e calcular a média
    const votesArray = ratings.map(rating => rating.rating); // Supondo que a coluna de valor de avaliação é 'value'
    const averageRating = votesArray.length
      ? (votesArray.reduce((a, b) => a + b, 0) / votesArray.length).toFixed(1)
      : null;

    // Adicionar a média das avaliações ao objeto do filme
    const movieWithRating = { ...movie, rating: averageRating };

    await this.redisService.set(cacheKey, JSON.stringify(movieWithRating), 3600);

    return movieWithRating;
  }

  // Agora filtrar filmes por genero

  async findMoviesByGenreId(genreId: number): Promise<Movie[]> {
    const cacheKey = `theGenre:${genreId}`;
    const cachedMovies = await this.redisService.get(cacheKey);

    if (cachedMovies) {
        return JSON.parse(cachedMovies);
    }
    const movieGenres = await this.movieGenreRepository.find({
        where: { genre: { id: genreId } }, relations: ['movie'],
    });
    const movieIds = movieGenres.map(movieGenre => movieGenre.movie.id);

    if (movieIds.length === 0) {
      return [];
    }
    const listMovies = this.movieRepository.findByIds(movieIds);
    await this.redisService.set(cacheKey, JSON.stringify(listMovies), 3600);
    return listMovies;
  }

  async findMoviesByGenreName(genreName: string): Promise<Movie[]> {
    const genre = await this.genreRepository.findOne({ where: { name: genreName } });
    if (!genre) {
        return [];
    } // Utilizar o ID do gênero para buscar os filmes
    return this.findMoviesByGenreId(genre.id);
  }

  // Agora funções como votar, adicionar, remover e editar filmes:

  async vote(userId: number, movieId: number, voteValue: number): Promise<void> {
    // Verifica se o usuário existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    } // Verifica se o usuário tem permissão para votar
    if (!user.authority.vote) {
      throw new ForbiddenException('User does not have permission to vote');
    } // Verifica o se o valor que ele votou esta dentro de 1 e 5 e é um inteiro:
    if (!Number.isInteger(voteValue) || voteValue < 1 || voteValue > 5) {
        throw new ForbiddenException('You need chosse a value between 1 and 5')
    }

    // Verifica se o filme existe
    const movie = await this.movieRepository.findOne({ where: { id: movieId } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    // Cria ou atualiza a classificação do usuário para o filme
    let rating = await this.ratingRepository.findOne({ where: { userId, movieId } });
    if (rating) {
      rating.rating = voteValue;
    } else {
      rating = this.ratingRepository.create({ userId, movieId, rating: voteValue });
    }
    await this.ratingRepository.save(rating);
  }

  async create(movieData: CreateMoviePost): Promise<Movie> {
    // Verifica se o ID fornecido já existe
    if (movieData.id) {
      const existingMovie = await this.movieRepository.findOne({
        where: { id: movieData.id }
      });
      if (existingMovie) {
        throw new NotFoundException(`Movie with ID ${movieData.id} already exists`);
      }
    }
  
    // Cria um novo filme com os dados fornecidos (ID, se fornecido)
    const movie = this.movieRepository.create({
      name: movieData.name,
      description: movieData.description,
      release_date: movieData.release_date,
      ...(movieData.id && { id: movieData.id }), // Inclui o ID apenas se fornecido
    });
  
    // Salva o filme no banco de dados
    const savedMovie = await this.movieRepository.save(movie);
  
    // Associa gêneros ao filme, se fornecidos
    if (movieData.genres && movieData.genres.length > 0) {
      for (const genreId of movieData.genres) {
        const genre = await this.genreRepository.findOne({
          where: {
            id: genreId,
          }
        });
        if (!genre) {
          throw new NotFoundException(`Genre with ID ${genreId} not found`);
        }
        await this.movieGenreRepository.save({
          movie: savedMovie,
          genre: genre,
        });
      }
    }
  
    // Limpa cache do Redis
    await this.redisService.del('allMovies');
    if (movieData.genres) {
      for (const genreId of movieData.genres) {
        await this.redisService.del(`theGenre:${genreId}`);
      }
    }
  
    return savedMovie;
  }
  

  async edit(id: number, movieData: Partial<Movie>): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    Object.assign(movie, movieData);
    return await this.movieRepository.save(movie);
  }

  async delete(id: number): Promise<{ success: boolean }> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    await this.movieRepository.remove(movie);
    return { success: true };
  }
}
