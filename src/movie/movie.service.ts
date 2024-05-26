import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Genre } from './entities/genres.entity';
import { Movie } from './entities/movies.entity';
import { MovieGenre } from './entities/movie-genre.entity';
import { Rating } from 'src/user/entities/rating.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { EditMoviePost } from './dto/update-movie.dto';
import { voteResult } from './movie.interface';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieGenre)
    private readonly movieGenreRepository: Repository<MovieGenre>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, 
  ) {}

  async findGenres(): Promise<Genre[]> {
    const cacheKey = 'genresList';
    let listGenres = await this.cacheManager.get<Genre[]>(cacheKey);

    if(!listGenres) {
      listGenres = await this.genreRepository.find();
      await this.cacheManager.set(cacheKey, listGenres);
    }
    return listGenres;
  }

  async findGenresName(): Promise<string[]> {
    const cacheKey = 'genreNames';
    let genreNames = await this.cacheManager.get<string[]>(cacheKey);
    if (!genreNames) {
      const genres = await this.genreRepository.find();
      genreNames = genres.map(genre => genre.name);
      await this.cacheManager.set(cacheKey, genreNames);

    }
    return genreNames;
  }
 
  async findAllMovies(): Promise<Movie[]> {
    const cacheKey = 'allMovies';
    let movies = await this.cacheManager.get<Movie[]>(cacheKey);

    if (!movies) {
      movies = await this.movieRepository.find();
      await this.cacheManager.set(cacheKey, movies);
    }

    return movies;

  }



  async findMovieById(id: number): Promise<any> {
    const cacheKey = `movie_${id}`;
    let movie = await this.cacheManager.get<any>(cacheKey);

    if (!movie) {
      movie = await this.movieRepository.findOne({
        where: { id: id },
      });
      if (!movie) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }
      const ratings = await this.ratingRepository.find({
        where: { movieId: id },
      });
      if (ratings.length === 0) {
        await this.cacheManager.set(cacheKey, movie);
        return movie;
      }
      const votesArray = ratings.map(rating => rating.rating);
      const averageRating = votesArray.length
        ? (votesArray.reduce((a, b) => a + b, 0) / votesArray.length).toFixed(1)
        : null;
      movie = { ...movie, rating: averageRating };
      await this.cacheManager.set(cacheKey, movie);
    }

    return movie;
  }



  async findMoviesByGenreId(genreId: number): Promise<Movie[]> {
    const cacheKey = `moviesByGenreId_${genreId}`;
    let movies = await this.cacheManager.get<Movie[]>(cacheKey);

    if (!movies) {
      const movieGenres = await this.movieGenreRepository.find({
        where: { genre: { id: genreId } }, relations: ['movie'],
      });
      const movieIds = movieGenres.map(movieGenre => movieGenre.movie.id);

      if (movieIds.length === 0) {
        return [];
      }
      movies = await this.movieRepository.findByIds(movieIds);
      await this.cacheManager.set(cacheKey, movies);
    }

    return movies;
  }



  async findMoviesByGenreName(genreName: string): Promise<Movie[]> {
    const cacheKey = `moviesByGenreName_${genreName}`;
    let movies = await this.cacheManager.get<Movie[]>(cacheKey);

    if (!movies) {
      const genre = await this.genreRepository.findOne({ where: { name: genreName } });
      if (!genre) {
        return [];
      }
      movies = await this.findMoviesByGenreId(genre.id);
      await this.cacheManager.set(cacheKey, movies);
    }

    return movies;
  }

  // Abaixo, Vote, Crate, Edit e Delete


  async vote(userId: number, movieId: number, voteValue: number): Promise<voteResult> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.authority.vote) {
      throw new ForbiddenException('User does not have permission to vote');
    }
    if (!Number.isInteger(voteValue) || voteValue < 1 || voteValue > 5) {
        throw new ForbiddenException('You need chosse a value between 1 and 5')
    }
    const movie = await this.movieRepository.findOne({ where: { id: movieId } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }
    let search = await this.ratingRepository.findOne({ where: { userId, movieId } });
    if (search) {
      const previou = search.rating;
      search.rating = voteValue;
      await this.ratingRepository.save(search);
      await this.cacheManager.del(`movie_${movieId}`);
      return { msg: 'Vote updated', username: user.username, moviename: movie.name, vote: voteValue, previousVote: previou};
    }
      const result = this.ratingRepository.create({ userId, movieId, rating: voteValue });
      await this.ratingRepository.save(result);
      await this.cacheManager.del(`movie_${movieId}`);
      return { msg: 'Vote accepted', username: user.username, moviename: movie.name, vote: voteValue };
  }



  async create(
    movieData: CreateMovieDto,
    userId: number,
  ): Promise<Movie> {
    if (movieData.id) {
      const existingMovie = await this.movieRepository.findOne({
        where: { id: movieData.id }
      });
      if (existingMovie) {
        throw new NotFoundException(`Movie with ID ${movieData.id} already exists`);
      }
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.authority.add) {
      throw new ForbiddenException('User does not have permission to create new');
    }
    const movie = this.movieRepository.create({
      name: movieData.name,
      description: movieData.description,
      release_date: movieData.release_date,
      ...(movieData.id && { id: movieData.id }), // Inclui o ID apenas se fornecido
    });
  
    const savedMovie = await this.movieRepository.save(movie);
    await this.cacheManager.del('allMovies');
  
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
        await this.cacheManager.del(`moviesByGenreId_${genreId}`);
        await this.cacheManager.del(`moviesByGenreName_${genre.name}`);
      }
    }
  
    return savedMovie;
  }
  


  async edit(
    id: number,
    movieData: EditMoviePost,
    userId: number
  ): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.authority.edit) {
      throw new ForbiddenException('User does not have permission to Edit');
    }
  
    if (movieData.name) {
      movie.name = movieData.name;
    }
    if (movieData.description) {
      movie.description = movieData.description;
    }
    if (movieData.release_date) {
      movie.release_date = movieData.release_date;
    }
  
    await this.movieRepository.save(movie);
  
    if (movieData.listGenres) {
      await this.movieGenreRepository.delete({ movie: { id: movie.id } });
      for (const genreId of movieData.listGenres) {
        const genre = await this.genreRepository.findOne({ where: { id: genreId } });
        if (!genre) {
          throw new NotFoundException(`Genre with ID ${genreId} not found`);
        }
        await this.movieGenreRepository.save({ movie, genre });
        await this.cacheManager.del(`moviesByGenreId_${genreId}`);
        await this.cacheManager.del(`moviesByGenreName_${genre.name}`);
      }
    } else {
      if (movieData.addGenres) {
        for (const genreId of movieData.addGenres) {
          const genre = await this.genreRepository.findOne({ where: { id: genreId } });
          if (!genre) {
            throw new NotFoundException(`Genre with ID ${genreId} not found`);
          }
          const existingRelation = await this.movieGenreRepository.findOne({ where: { movie: { id: movie.id }, genre: { id: genre.id } } });
          if (!existingRelation) {
            await this.movieGenreRepository.save({ movie, genre });
            await this.cacheManager.del(`moviesByGenreId_${genreId}`);
            await this.cacheManager.del(`moviesByGenreName_${genre.name}`);
          }
        }
      }
  
      if (movieData.delGenres) {
        for (const genreId of movieData.delGenres) {
          const genre = await this.genreRepository.findOne({ where: { id: genreId } });
          if (!genre) {
            throw new NotFoundException(`Genre with ID ${genreId} not found`);
          }
          await this.movieGenreRepository.delete({ movie: { id: movie.id }, genre: { id: genre.id } });
          await this.cacheManager.del(`moviesByGenreId_${genreId}`);
          await this.cacheManager.del(`moviesByGenreName_${genre.name}`);
        }
      }
    }
  
    await this.cacheManager.del(`movie_${id}`);
    await this.cacheManager.del('allMovies');

    return movie;
  }



  async delete(
    id: number,
    userId: number,
  ): Promise<{ success: boolean }> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.authority.del) {
      throw new ForbiddenException('User does not have permission to Delete');
    }
    await this.movieRepository.remove(movie);
    await this.cacheManager.del(`movie_${id}`);
    await this.cacheManager.del('allMovies');

    const movieGenres = await this.movieGenreRepository.find({ where: { movie: { id: id } } });
    for (const movieGenre of movieGenres) {
      await this.cacheManager.del(`moviesByGenreId_${movieGenre.genre.id}`);
      await this.cacheManager.del(`moviesByGenreName_${movieGenre.genre.name}`);
    }

    return { success: true };
  }



  async getVotesByMovieId(movieId: number): Promise<Rating[]> {
    const votes = await this.ratingRepository.find({ where: { movieId } });
    if (!votes || votes.length === 0) {
      throw new NotFoundException(`No votes found for movie with ID ${movieId}`);
    }
    return votes;
  }

  async getVotesByUserId(userId: number): Promise<Rating[]> {
    const votes = await this.ratingRepository.find({ where: { userId } });
    if (!votes || votes.length === 0) {
      throw new NotFoundException(`No votes found for user with ID ${userId}`);
    }
    return votes;
  }

  async setCacheKey(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async getCacheKey(key: string): Promise<string> {
    return await this.cacheManager.get(key);
  }

  clearCache(): void {
    this.cacheManager.reset(); // Limpa todo o cache
  }
}
